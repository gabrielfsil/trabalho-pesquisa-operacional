import { formatMonth } from "@shared/utils/date";
import { readFileStream } from "@shared/utils/readFileStream";
import express from "express";
const GLPK = require("glpk.js");

const app = express();

app.use(express.json());

interface Data {
  name: string;
  coef: number;
}

app.post("/optimize", async (request, response) => {
  const { weight_input = 12.5, weight_output = 17.4 } = request.body;

  const glpk = GLPK();

  const options = {
    msglev: glpk.GLP_MSG_ALL,
    presol: true,
    cb: {
      call: (progress: any) => console.log(progress),
      each: 1,
    },
  };

  const datesBullSale = [
    "01/10/2020",
    "01/11/2020",
    "01/12/2020",
    "01/01/2021",
    "01/02/2021",
    "01/03/2021",
    "01/04/2021",
    "01/05/2021",
    "01/06/2021",
    "01/07/2021",
    "01/08/2021",
    "01/09/2021",
    "01/10/2021",
    "01/11/2021",
    "01/12/2021",
  ];

  const dates = [
    "01/01/2021",
    "01/02/2021",
    "01/03/2021",
    "01/04/2021",
    "01/05/2021",
    "01/06/2021",
    "01/07/2021",
    "01/08/2021",
    "01/09/2021",
    "01/10/2021",
    "01/11/2021",
    "01/12/2021",
  ];

  const bull = await readFileStream(__dirname + "/../../../assets/bull.csv");
  const corn = await readFileStream(__dirname + "/../../../assets/corn.csv");

  const vars = datesBullSale.reduce((data, date, index) => {
    var count = 0;

    var cornBuy = corn.reduce((acc, cot) => {
      if (count === 3) {
        acc += 67.5 * cot.value;
        count++;
      }

      if (count === 1 || count === 2) {
        acc += 135 * cot.value;
        count++;
      }

      if (new Date(date).getTime() === cot.date.getTime()) {
        acc = 121.5 * cot.value;
        count++;
      }
      return acc;
    }, 0);

    const bullBuy = bull.reduce((acc, cot) => {
      if (new Date(date).getTime() === cot.date.getTime()) {
        acc = Number(weight_input) * cot.value;
      }

      return acc;
    }, 0);

    count = 0;

    const bullSale = bull.reduce((acc, cot) => {
      if (count === 3) {
        acc = Number(weight_output) * cot.value;
        count++;
      }

      if (count === 1 || count === 2) {
        count++;
      }

      if (new Date(date).getTime() === cot.date.getTime()) {
        count++;
      }

      return acc;
    }, 0);

    cornBuy += 408;

    if (bullSale !== 0) {
      data.push({
        name: date,
        coef: bullSale - bullBuy - cornBuy,
      });
    }
    return data;
  }, [] as Data[]);

  const restrict = [
    { name: "01/10/2020", coef: 1 },
    { name: "01/11/2020", coef: 1 },
    { name: "01/12/2020", coef: 1 },
    { name: "01/01/2021", coef: 1 },
    { name: "01/02/2021", coef: 1 },
    { name: "01/03/2021", coef: 1 },
    { name: "01/04/2021", coef: 1 },
    { name: "01/05/2021", coef: 1 },
    { name: "01/06/2021", coef: 1 },
    { name: "01/07/2021", coef: 1 },
    { name: "01/08/2021", coef: 1 },
    { name: "01/09/2021", coef: 1 },
  ];

  const res = await glpk.solve(
    {
      name: "LP",
      objective: {
        direction: glpk.GLP_MAX,
        name: "obj",
        vars,
      },
      subjectTo: [
        {
          name: "cons1",
          vars: restrict,
          bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 1.0 },
        },
      ],
    },
    options
  );

  const { vars: variables, z } = res.result;

  const month = formatMonth(variables);

  return response.json({
    gain: z,
    month
  });
});

app.listen(3333, () => console.log("Server is running in port 3333"));
