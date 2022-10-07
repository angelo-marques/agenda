import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ZodError } from "zod";
import { Api } from "~/recursos";
import { Error, NotFound } from "~/recursos/componentes";
import { AgendamentoForm } from "~/recursos/agenda/componentes/AgendamentoForm";
import { extractValidationErrors, Validator } from "~/utils/validador";
import { redirect } from "@remix-run/node";
import type { Agendamento } from "@prisma/client";

export interface LoaderData {
  agendamento: Agendamento;
}

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

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | Response> => {
  const agendamento = await Api.getDadosAgendaPorId(params.agendaId);

  if (!agendamento) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  return { agendamento };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response | void> => {
  const data = Object.fromEntries(await request.formData());

  try {
    // @ts-ignore
    await Api.saveAgendamento(Validator.parse(data), Number(params.agendaId));

    return redirect(".");
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationErrors(error),
        formValues: {
          id: Number(data.id.toString()) as number,
          title: data.title.toString() as string,
          dataInicial: data.dataInicial.valueOf() as Date,
          dataFinal: data.dataFinal.valueOf() as Date,
        },
      };
    }

    // @ts-ignore
    throw new Error(error.message);
  }
};

export default function () {
  const { agendamento } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  return (
    <>
      <form action={`${agendamento.id}/delete`} method="post">
        <button
          type="submit"
          className="mb-4 bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </form>
      <AgendamentoForm actionData={actionData} agendamento={agendamento} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}

export function CatchBoundary() {
  return <NotFound message="We couldn'd find a course with provided ID" />;
}
