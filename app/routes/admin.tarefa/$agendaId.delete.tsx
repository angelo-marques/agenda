
import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Api } from "~/recursos";

export const action: ActionFunction = async ({ params }): Promise<Response> => {
  await Api.deleteAgendamento(Number(params.agendaId!));
  return redirect("..");
};
