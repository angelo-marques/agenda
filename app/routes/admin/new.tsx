
import { ZodError } from "zod";
import { extractValidationErrors, Validator } from "~/utils/validador";
import { Api } from "~/recursos";
import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AgendamentoForm } from "~/recursos/agenda/componentes/AgendamentoForm";

export interface FormFields {              
    title : string;
    dataInicial? : string ;
    dataFinal? : string;
}

export interface ActionData {
  formErrors?: Partial<FormFields> ;
  formValues?: FormFields;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response | void > => {
  const data = Object.fromEntries(await request.formData());

  try {
    await Api.saveAgendamento(Validator.parse(data));

    return redirect(".");
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationErrors(error),
        formValues: {
          title: data.title as string,
           dataInicial: data?.dataInicial.toString(),
           dataFinal: data?.dataFinal?.toString(),
        },
      };
    }

    // @ts-ignore
    throw new Error(error.message);
  }
};
// @ts-ignore
export default function () {
  const actionData = useActionData<ActionData>();
  return <AgendamentoForm actionData = { actionData } />;
}