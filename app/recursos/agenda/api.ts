
import type { FormFields } from "~/routes/admin.tarefa/new";
import { db } from "~/utils/db.server";
import type { Agendamento } from "@prisma/client";
import { ZodError } from "zod";
import {  date, extractValidationErrors } from "~/utils/validador";

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
    
    if(data.dataInicial >= data.dataFinal){
        throw "Erro na aplicação";
    }

    const parseDataInicial = new Date(data.dataInicial);
    const parseDataFinal = new Date(data.dataFinal);
    const dataFormatadaInicial = new Date(parseDataInicial.getFullYear(), parseDataInicial.getMonth(), parseDataInicial.getDay(), parseDataInicial.getHours(), 0, 0);
    const dataFormatadaFinal = new Date(parseDataFinal.getFullYear(), parseDataFinal.getMonth(), parseDataFinal.getDay(), parseDataFinal.getHours(), 0, 0 );

    const dados = await getDadosAgendaPeriodo(dataFormatadaInicial, dataFormatadaFinal);
   
    if(dados.length > 0){
        for(var i = 0; i <= dados.length; i++){
            if(dados[i].id != data.id){
                if(dados[i].dataInicial.getMinutes() > 0 && data.dataInicial.getMinutes() > dados[i].dataInicial.getMinutes())
                {
                    if( dados[i].dataInicial.getMinutes() - data.dataInicial.getMinutes() < 10){
                        throw "Horário de inicio muito próximo de outro agendamento";
                    } 
                }
                if(dados[i].dataFinal.getMinutes() > 0 && data.dataFinal.getMinutes() > dados[i].dataFinal.getMinutes())
                {
                    if( dados[i].dataFinal.getMinutes() - data.dataFinal.getMinutes() < 10){
                        throw "Horário de final muito próximo de outro agendamento";
                    } 
                }
            }
            
        }
    }
    if (agendaId) {
      
        return db.agendamento.update({
          where: { id: Number(agendaId) },
          data:{
              title: data.title,
              dataInicial: new Date(data.dataInicial),
              dataFinal: new Date(data.dataFinal),
          },
        });
      }else{
          return db.agendamento.create({
              data:{
                  title: data.title,
                  dataInicial: new Date(data.dataInicial),
                  dataFinal: new Date(data.dataFinal),
              },
          });
      }
    

   
}
    
export async function deleteAgendamento(id: number): Promise<Agendamento> {
    return db.agendamento.delete({ where: { id } });
}