import type { RequestHandler } from "@sveltejs/kit";

// @TODO: Persist in a database.
const todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const todo = data.get("text")?.toString();
    todo && todos.push({ text: todo, done: false, created_at: new Date() });
    return {
        status: 303,
        headers: { location: "/" }
    }
}