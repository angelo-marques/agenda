import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Agendamento } from "~/models/Agendamento";
import { getListaDadosAgenda } from "~/recursos/agenda/api";


interface LoadData {
    agendas : Agendamento[];
  }
  
export const loader: LoaderFunction = async () => {
    
    return {
        agendas: (await getListaDadosAgenda())
    }   
};

export default function Index() {
    const { agendas } = useLoaderData<LoadData>();
  
    return (
      <div>
        <h1>Appointments</h1>
        <ul>
          {agendas?.map((appointment) => <li key={appointment.id}>{appointment.id} - {appointment.dataInicial} - {appointment.dataFinal}</li>)}
        </ul>
      </div>
    );
  }