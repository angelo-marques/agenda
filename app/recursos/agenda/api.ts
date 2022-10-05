import { db } from "~/utils/db.server";

export const getListaDadosAgenda = async () =>{

    const agendas = await db.agendamento.findMany();
    console.log(agendas);
  
    return {
        agendas,
    };
  
}