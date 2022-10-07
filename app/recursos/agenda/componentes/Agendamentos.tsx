import type { Agenda as AgendamentoType } from "~/models/Agenda";
import { Link, Outlet } from "@remix-run/react";
import { AgendamentoUpdate } from "./AgendamentoUpdate";
export interface AgendamentosProps {
  agendamentos: AgendamentoType[];
}

export function Agendamentos({ agendamentos }: AgendamentosProps) {
  return (
    <div className="container mx-auto pt-8">
      <div className="flex mb-4">
        <h1 className="font-semibold text-2xl text-gray-500 underline mb-5 flex-1">
          Agendamentos
        </h1>
        <div>
          <Link
            to="new"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Novo
          </Link>
        </div>
      </div>
      <div className="mb-6">
        <Outlet />
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {agendamentos.map((agendamento) => (
          <AgendamentoUpdate key={agendamento.id} agendamento={agendamento} />
        ))}
      </ul>
    </div>
  );
}
