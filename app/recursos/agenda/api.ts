
import type { FormFields } from "~/routes/admin.tarefa/new";
import { db } from "~/utils/db.server";
import type { Agendamento } from "@prisma/client";
import { ZodError } from "zod";
import {  extractValidationErrors } from "~/utils/validador";

//Lista todos os dados
export async function getListaDadosAgenda(): Promise<Agendamento[]>{
   const resposta = db.agendamento.findMany({
        orderBy: {
            id: "asc",
        },
    });
 
    return resposta;

}


// pega dado por id
export async function getDadosAgendaPorId(pesquisaId: any): Promise<Agendamento | null>{

    if(pesquisaId === null){
        throw new Error("Informe o titulo que está pesquisando");
    }

    return db.agendamento.findFirstOrThrow({
        where: {
            id: Number(pesquisaId)
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
            dataInicial: pesquisaDataInicial,
            dataFinal: pesquisaDataFinal
        },
        orderBy: {
            dataFinal: "asc"
        }
    });

}

export async function saveAgendamento(
    data: FormFields,
    agendaId?: any,
  ): Promise<Agendamento> {
    if(data.dataInicial > data.dataFinal){
        throw "Erro na aplicação";
    }
    const dataTime = data.dataInicial;
    dataTime.setDate(data.dataInicial.getDay() - 1);
     
    const dados = await getDadosAgendaPeriodo(dataTime, data.dataFinal);
    for(var i = 0; i <= dados.length; i++){
    if( dados[i].dataInicial.valueOf() - data.dataInicial.valueOf() < 20){
        throw "Erro na aplicação";
    } 
    
 
 }

 
    if (agendaId) {
      return db.agendamento.update({
        where: { id: Number(agendaId) },
        data:{
            title: data.title,
            dataInicial: data.dataInicial,
            dataFinal: data.dataFinal,
        },
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