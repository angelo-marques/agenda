import type { Agenda } from "~/models/Agenda";
import { Link } from "@remix-run/react";
import { date } from "~/utils/validador"; 

export interface AgendamentoProps {
  agendamento: Agenda;
}

export function AgendamentoUpdate({ agendamento }: AgendamentoProps) {
  return (
    <li className="p-4 border-2 border-gray-500 rounded-md shadow-md hover:shadow-none cursor-pointer hover:-translate-y-1 hover:bg-slate-100">
      <Link to={agendamento.id.toString()}>
        <h3 className="text-lg text-slate-500 font-semibold mb-2">
          {agendamento.id}
        </h3>
        <h3 className="text-lg text-slate-500 font-semibold mb-2">
          {agendamento.title}
        </h3>
        <p className="text-right text-sm  text-gray-400">
          {date(agendamento.dataInicial)}
        </p>
         <p className="text-right text-sm  text-gray-400">
          {date(agendamento.dataFinal)}
        </p>
      </Link>
    </li>
  );
}