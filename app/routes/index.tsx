import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => redirect(`/admin/tarefa`);
