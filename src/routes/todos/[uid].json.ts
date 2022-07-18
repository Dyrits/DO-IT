import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const del: RequestHandler = async (event) => { return await api(event); };
export const patch: RequestHandler = async (event) => { return await api(event); }