import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Agenda } from "~/models/Agenda";
import { getListaDadosAgenda } from "~/recursos/agenda/api";
import { Agendamentos } from "~/recursos/agenda/componentes/Agendamentos";

interface LoaderData {
  agendas: Agenda[];
}

export const loader: LoaderFunction = async () => {
  return {
    agendas: await getListaDadosAgenda(),
  };
};

export default function () {
  const { agendas } = useLoaderData<LoaderData>();
  return <Agendamentos agendamentos={agendas} />;
}
