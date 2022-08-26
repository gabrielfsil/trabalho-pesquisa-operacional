import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { InputMask } from "./components/InputMask";
import { api } from "./services/api";

const logo = require("./assets/setting.png");

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface FormValues {
  bull_purchase_price: string;
  bull_sale_price: string;
  corn_purchase_price: string;
  capital: string;
  minimum_lot: number;
  corral_area: number;
  water_capacity: number;
  trough_length: number;
  angus_production: number;
  nelore_production: number;
  input_weight: number;
}

const ValidationSchema = yup.object().shape({
  bull_purchase_price: yup.string().required("Esse campo é obrigatório."),
  bull_sale_price: yup.string().required("Esse campo é obrigatório."),
  corn_purchase_price: yup.string().required("Esse campo é obrigatório."),
  capital: yup.string().required("Esse campo é obrigatório."),
  minimum_lot: yup.number().required("Esse campo é obrigatório."),
  corral_area: yup.number().required("Esse campo é obrigatório."),
  water_capacity: yup.number().required("Esse campo é obrigatório."),
  trough_length: yup.number().required("Esse campo é obrigatório."),
  angus_production: yup.number().required("Esse campo é obrigatório."),
  nelore_production: yup.number().required("Esse campo é obrigatório."),
  input_weight: yup.number().required("Esse campo é obrigatório."),
});

interface Result {
  cplex: string;
  result: {
    name: string;
    time: number;
    result: {
      status: number;
      z: number;
      vars: {
        Angus: number;
        Nelore: number;
        Cruzado: number;
      };
      dual?: {};
    };
  };
}

function App() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      bull_purchase_price: `R$294,00`,
      bull_sale_price: `R$280,00`,
      corn_purchase_price: `R$84,00`,
      capital: `R$500.000,00`,
      minimum_lot: 100,
      corral_area: 1527,
      water_capacity: 5000,
      trough_length: 47,
      angus_production: 1000,
      nelore_production: 10000,
      input_weight: 13,
    },
  });

  const [result, setResult] = useState<Result>();

  const handleSubmitForm: SubmitHandler<FormValues> = useCallback(
    async (formValue) => {
      api
        .post("/optimize", {
          bull_purchase_price:
            Number(
              formValue.bull_purchase_price.replace("R$", "").replace(",", ".")
            ) / 15,
          bull_sale_price:
            Number(
              formValue.bull_sale_price.replace("R$", "").replace(",", ".")
            ) / 15,
          corn_purchase_price:
            Number(
              formValue.corn_purchase_price.replace("R$", "").replace(",", ".")
            ) / 60,
          capital: Number(
            formValue.capital
              .replace("R$", "")
              .replace(".", "")
              .replace(",", ".")
          ),
          minimum_lot: formValue.minimum_lot,
          corral_area: formValue.corral_area,
          water_capacity: formValue.water_capacity,
          trough_length: formValue.trough_length,
          angus_production: formValue.angus_production,
          nelore_production: formValue.nelore_production,
          input_weight: formValue.input_weight * 30,
        })
        .then((response) => {
          setResult(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    []
  );

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8" src={logo} alt="Workflow" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <a
                          href="#"
                          className={classNames(
                            "bg-gray-900 text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={"page"}
                        >
                          Painel
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6"></div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl tracking-tight font-bold text-gray-900">
              Processo de Otimização
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="p-4">
                <p>
                  A ferramenta abaixo irá calcular a proporção ideal de raças em
                  um confinamento bovino, levando em consideração as raças
                  Angus, Nelore e Cruzado.
                </p>
              </div>
              <div className="border-4 border-dashed border-gray-200 rounded-lg">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Preço de Compra - Boi (R$ / @)
                            </label>
                            <InputMask
                              {...register("bull_purchase_price")}
                              className="p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              defaultValue={"R$294,00"}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Preço de Venda - Boi (R$ / @)
                            </label>
                            <InputMask
                              {...register("bull_sale_price")}
                              className="p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              defaultValue={"R$280,00"}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Preço de Compra - Milho (R$ / 60 kg)
                            </label>
                            <InputMask
                              {...register("corn_purchase_price")}
                              className="p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              defaultValue={"R$84,00"}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Peso de Entrada ( @ )
                            </label>
                            <input
                              type="number"
                              {...register("input_weight")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Capital (R$)
                            </label>
                            <InputMask
                              {...register("capital")}
                              className="p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              defaultValue={"R$500.000,00"}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Lote Mínimo ( Cabeças )
                            </label>
                            <input
                              type="number"
                              {...register("minimum_lot")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Área do Curral ( m² )
                            </label>
                            <input
                              type="number"
                              {...register("corral_area")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Capacidade do Tanque de Água ( Litros )
                            </label>
                            <input
                              type="number"
                              {...register("water_capacity")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Comprimento de Cocho ( m )
                            </label>
                            <input
                              type="number"
                              {...register("trough_length")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3"></div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Produção Mínima de Carne de Angus ( Kg )
                            </label>
                            <input
                              type="number"
                              {...register("angus_production")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Produção Mínima de Carne de Nelore e Cruzado ( Kg
                              )
                            </label>
                            <input
                              type="number"
                              {...register("nelore_production")}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Otimizar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {result && (
              <>
                <h3>Resultado:</h3>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button onClick={() => setResult(undefined)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Limpar
                  </button>
                </div>
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg p-5">
                    <>
                      <div className="grid grid-cols-8 gap-6">
                        <div className="col-span-8 sm:col-span-2">
                          <p>Lucro Obitido:</p>
                          <b>
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(result.result.result.z)}
                          </b>
                        </div>
                        <div className="col-span-8 sm:col-span-2">
                          <p>Quant. de Angus:</p>
                          <b>{result.result.result.vars.Angus}</b>
                        </div>
                        <div className="col-span-8 sm:col-span-2">
                          <p>Quant. de Nelore:</p>
                          <b>{result.result.result.vars.Nelore}</b>
                        </div>
                        <div className="col-span-8 sm:col-span-2">
                          <p>Quant. de Cruzado:</p>
                          <b>{result.result.result.vars.Cruzado}</b>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
                <h3>Modelo:</h3>
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg p-5">
                    <pre>{result.cplex}</pre>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
