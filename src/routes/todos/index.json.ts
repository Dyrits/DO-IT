import type { RequestHandler } from "@sveltejs/kit";

import { api } from "./_api";

export const get: RequestHandler = (event) => { return api(event); }
export const post: RequestHandler = async (event) => { return await api(event); }