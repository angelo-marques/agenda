import type { Agendamento } from "@prisma/client";
import { Link } from "@remix-run/react";
import { date } from "~/utils/validador"; 

export interface AgendamentoProps {
  agendamento: Agendamento;
}

export function AgendamentoUpdate({ agendamento }: AgendamentoProps) {
  return (
    <li className="p-4 border-2 border-gray-500 rounded-md shadow-md hover:shadow-none cursor-pointer hover:-translate-y-1 hover:bg-slate-100">
      <Link to={agendamento.title}>
        <h3 className="text-lg text-slate-500 font-semibold mb-2">
          {agendamento.title}
        </h3>
        <p className="text-right text-sm  text-gray-400">
          {date(agendamento.dataInicial)}
        </p>
      </Link>
    </li>
  );
}