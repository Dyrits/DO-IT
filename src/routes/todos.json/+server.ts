import type { RequestHandler } from '@sveltejs/kit';
import { api } from '#lib/todos.ts';
export const GET: RequestHandler = api;
export const POST: RequestHandler = api;
