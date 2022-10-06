
import type { FormFields } from "~/routes/admin/new";
import { db } from "~/utils/db.server";
import type { Agendamento } from "@prisma/client";


//Lista todos os dados
export async function getListaDadosAgenda(): Promise<Agendamento[]>{
    
    return db.agendamento.findMany({
        orderBy: {
            id: "asc",
        },
    });

}

// pega dado por id
export async function getDadosAgendaPorId(pesquisaId: number): Promise<Agendamento | null>{
    
    return db.agendamento.findUnique({
        where: {
            id: pesquisaId
        },
    });

}

//buscar por titulo
export async function getDadosAgendaPorTitulo(pesquisaTitulo: any): Promise<Agendamento | null>{
    if(pesquisaTitulo === null){
        throw new Error("Informe o titulo que está pesquisando");
    }

    return db.agendamento.findFirst({
        take:1,
        where: {
            title: {
                contains: pesquisaTitulo,
            },
        },
    });

}


//filtra dados por periodo inicio e fim
export async function getDadosAgendaPeriodo(pesquisaDataInicial: Date, pesquisaDataFinal: Date): Promise<Agendamento[]>{

    
    if(pesquisaDataInicial > pesquisaDataFinal){
        throw new Error("Data inicial maior que data final.");
    }

    if(pesquisaDataInicial == null || pesquisaDataFinal == null){
        throw new Error("Informe a data inicial e final.");
    }

    return db.agendamento.findMany({
        where: {
            dataInicial: pesquisaDataFinal,
            dataFinal: pesquisaDataFinal
        },
        orderBy: {
            dataFinal: "asc"
        }
    });

}

export async function saveAgendamento(
    data: FormFields,
    id?: number,
  ): Promise<Agendamento> {
    if (id) {
      return db.agendamento.update({
        where: { id },
        data,
      });
    }
  
    return db.agendamento.create({
        data:{
            title: data.title,
            dataInicial: data.dataInicial,
            dataFinal: data.dataFinal,
        },
    });
}
    
export async function deleteCourse(id: number): Promise<Agendamento> {
    return db.agendamento.delete({ where: { id } });
}