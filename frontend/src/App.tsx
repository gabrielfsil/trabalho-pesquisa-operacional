import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

const logo = require("./assets/setting.png");

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const {} = useForm();

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
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Capital Inicial (R$)
                            </label>
                            <input
                              type="number"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Street address
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <input
                              type="text"
                              name="region"
                              id="region"
                              autoComplete="address-level1"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ZIP / Postal code
                            </label>
                            <input
                              type="text"
                              name="postal-code"
                              id="postal-code"
                              autoComplete="postal-code"
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
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
