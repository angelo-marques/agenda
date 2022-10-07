import { ZodError } from "zod";
import { extractValidationErrors, Validator } from "~/utils/validador";
import { Api } from "~/recursos";
import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AgendamentoForm } from "~/recursos/agenda/componentes/AgendamentoForm";

export interface FormFields {
  id: number;
  title: string;
  dataInicial: Date;
  dataFinal: Date;
}

export interface ActionData {
  formErrors: Partial<FormFields>;
  formValues: FormFields;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response | void> => {
  const data = Object.fromEntries(await request.formData());

  try {
    //@ts-ignore
    await Api.saveAgendamento(Validator.parse(data));

    return redirect(".");
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationErrors(error),
        formValues: {
          id: parseInt(data.id.toString()),
          title: data.title as string,
          dataInicial: data?.dataInicial.valueOf() as Date,
          dataFinal: data?.dataFinal.valueOf() as Date,
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
  //@ts-ignore
  return <AgendamentoForm actionData={actionData} />;
}
