
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Agenda } from "~/models/Agenda";
import { getListaDadosAgenda } from "~/recursos/agenda/api";
import { Agendamentos } from "~/recursos/agenda/componentes/Agendamentos";


interface LoaderData {
    agendas : Agenda[];
  }
  
export const loader: LoaderFunction = async () => {
    
    return {
        agendas: (await getListaDadosAgenda()),
    }   
};

export default function () {
  const { agendas } = useLoaderData<LoaderData>();
  return <Agendamentos agendamentos={agendas} />;
}

// export default function Index() {
//     const { agendas } = useLoaderData<LoaderData>();
  
//     return (
//       <div>
//         <h1>Appointments</h1>
//         <ul>
//           {agendas?.map((appointment) => <li key={appointment.id}>{appointment.id} - {appointment.dataInicial} - {appointment.dataFinal}</li>)}
//         </ul>
//       </div>
//     );
//   }