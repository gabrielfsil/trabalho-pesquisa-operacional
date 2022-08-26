import { formatMonth } from "@shared/utils/date";
import { readFileStream } from "@shared/utils/readFileStream";
import express from "express";
import cors from "cors";
const GLPK = require("glpk.js");

const app = express();

app.use(cors());
app.use(express.json());

interface Data {
  name: string;
  coef: number;
}

app.post("/optimize", async (request, response) => {
  const {
    bull_purchase_price,
    bull_sale_price,
    corn_purchase_price,
    capital,
    minimum_lot,
    corral_area,
    water_capacity,
    trough_length,
    angus_production,
    nelore_production,
    input_weight,
  } = request.body;

  const glpk = GLPK();

  const options = {
    msglev: glpk.GLP_MSG_ALL,
    presol: true,
    cb: {
      call: (progress: any) => {},
      each: 1,
    },
  };

  const productionAngus = (115 * 1.6 + input_weight) / 2;
  const productionNelore = (120 * 1.2 + input_weight) / 2;
  const productionCruzado = (130 * 1 + input_weight) / 2;

  const purchaseAngus = (input_weight / 2) * bull_purchase_price * 1.06;
  const purchaseNelore = (input_weight / 2) * bull_purchase_price;
  const purchaseCruzado = (input_weight / 2) * bull_purchase_price * 0.96;

  const saleAngus = ((115 * 1.6 * 1.06 + input_weight) / 2) * bull_sale_price;
  const saleNelore = ((120 * 1.2 + input_weight) / 2) * bull_sale_price;
  const saleCruzado = ((130 * 1 * 0.96 + input_weight) / 2) * bull_sale_price;

  const coefAngus = saleAngus - purchaseAngus - corn_purchase_price * 4.6 * 115;

  const coefNelore =
    saleNelore - purchaseNelore - corn_purchase_price * 4.6 * 120;

  const coefCruzado =
    saleCruzado - purchaseCruzado - corn_purchase_price * 4.6 * 130;

  const params = {
    name: "Confinamento",
    objective: {
      direction: glpk.GLP_MAX,
      name: "obj",
      vars: [
        { name: "Angus", coef: coefAngus },
        { name: "Nelore", coef: coefNelore },
        { name: "Cruzado", coef: coefCruzado },
      ],
    },
    subjectTo: [
      {
        name: "Area",
        vars: [
          { name: "Angus", coef: 20 },
          { name: "Nelore", coef: 15 },
          { name: "Cruzado", coef: 13 },
        ],
        bnds: { type: glpk.GLP_UP, ub: corral_area, lb: 0 },
      },
      {
        name: "Lote Minimo",
        vars: [
          { name: "Angus", coef: 1 },
          { name: "Nelore", coef: 1 },
          { name: "Cruzado", coef: 1 },
        ],
        bnds: { type: glpk.GLP_LO, lb: minimum_lot },
      },
      {
        name: "Producao de Angus",
        vars: [
          { name: "Angus", coef: productionAngus },
          { name: "Nelore", coef: 0 },
          { name: "Cruzado", coef: 0 },
        ],
        bnds: { type: glpk.GLP_LO, lb: angus_production },
      },
      {
        name: "Producao de Nelore e Cruzado",
        vars: [
          { name: "Angus", coef: 0 },
          { name: "Nelore", coef: productionNelore },
          { name: "Cruzado", coef: productionCruzado },
        ],
        bnds: { type: glpk.GLP_LO, lb: nelore_production },
      },
      {
        name: "Agua",
        vars: [
          { name: "Angus", coef: 50 },
          { name: "Nelore", coef: 40 },
          { name: "Cruzado", coef: 45 },
        ],
        bnds: { type: glpk.GLP_UP, ub: water_capacity, lb: 0 },
      },
      {
        name: "Cocho",
        vars: [
          { name: "Angus", coef: 0.35 },
          { name: "Nelore", coef: 0.35 },
          { name: "Cruzado", coef: 0.35 },
        ],
        bnds: { type: glpk.GLP_UP, ub: trough_length, lb: 0 },
      },
      {
        name: "Orcamento",
        vars: [
          { name: "Angus", coef: purchaseAngus },
          { name: "Nelore", coef: purchaseNelore },
          { name: "Cruzado", coef: purchaseCruzado },
        ],
        bnds: { type: glpk.GLP_UP, ub: capital, lb: 0 },
      },
    ],
    generals: ["Angus", "Nelore", "Cruzado"],
    options: {
      msglev: 4,
    },
  };

  const result: object = await glpk.solve(params, options);

  const cplex = await glpk.write(params);
  return response.json({
    result,
    cplex,
  });
});

app.listen(3333, () => console.log("Server is running in port 3333"));
