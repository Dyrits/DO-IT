import type { RequestHandler } from '@sveltejs/kit';
import { api } from '#lib/todos.ts';
export const POST: RequestHandler = api;
export const PATCH: RequestHandler = api;
export const DELETE: RequestHandler = api;
