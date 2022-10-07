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
//   return (
//     <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
//       <h1>Welcome to Remix</h1>
//       <ul>
//         <li>
//           <a
//             target="_blank"
//             href="https://remix.run/tutorials/blog"
//             rel="noreferrer"
//           >
//             15m Quickstart Blog Tutorial
//           </a>
//         </li>
//         <li>
//           <a
//             target="_blank"
//             href="https://remix.run/tutorials/jokes"
//             rel="noreferrer"
//           >
//             Deep Dive Jokes App Tutorial
//           </a>
//         </li>
//         <li>
//           <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
//             Remix Docs
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }
