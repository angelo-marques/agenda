import type { Agendamento } from "@prisma/client";
import type { ActionData } from "~/routes/admin/new";

export interface AgendamentoFormProps {
  actionData?: ActionData;
  agendamento?: Agendamento;
}

export function AgendamentoForm({ actionData, agendamento }: AgendamentoFormProps) {

  return (
    <form method="POST">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Novo Evento
            </h3>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                // minLength={6}
                defaultValue={actionData?.formValues?.title.toString() ?? agendamento?.title.toString()}
                key={actionData?.formValues?.title.toString() ?? agendamento?.title.toString()}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {actionData?.formErrors?.title ? (
                <p className="text-xs text-red-500 pt-2">
                  {actionData.formErrors.title.toString()}
                </p>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Data Inicio
              </label>
              <input
                type="date"
                name="dataInicial"
                id="dataInicial"
                // minLength={12}
                autoComplete="family-name"
                defaultValue={
                  actionData?.formValues?.dataInicial?.toString() ?? agendamento?.dataInicial?.toString()
                }
                key={actionData?.formValues?.dataInicial?.toString() ?? agendamento?.dataInicial?.toString()}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {actionData?.formErrors?.dataInicial?.toString() ? (
                <p className="text-xs text-red-500 pt-2">
                  {actionData.formErrors.dataInicial?.toString()}
                </p>
              ) : null}
            </div>
            
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Data Inicio
              </label>
              <input
                type="date"
                name="dataFinal"
                id="dataFinal"
                // minLength={12}
                autoComplete="family-name"
                defaultValue={
                  actionData?.formValues?.dataFinal?.toString() ?? agendamento?.dataFinal?.toString()
                }
                key={actionData?.formValues?.dataFinal?.toString() ?? agendamento?.dataFinal?.toString()}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {actionData?.formErrors?.dataFinal?.toString() ? (
                <p className="text-xs text-red-500 pt-2">
                  {actionData.formErrors.dataFinal?.toString()}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
