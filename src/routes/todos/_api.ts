import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";

// @TODO: Persist in a database.
export let todos: Todo[] = [];

export const api = async ({ locals, request, params }: RequestEvent) => {
    let response: RequestHandlerOutput = { status: 500 };
    // @ts-ignore
    switch (locals.method) {
        case "GET":
            response = { ...response, status: 200, body: todos };
            break;
        case "POST":
            const data = await request.formData();
            const todo = data.get("text")?.toString();
            todo && todos.push({ uid: `${Date.now()}`, text: todo, done: false, created_at: new Date() });
            response = { ...response, body: todo };
            break;
        case "DELETE":
            const { uid } = params;
            todos = todos.filter(todo => todo.uid !== uid);
            break;
        default:
            break;
    }
    // @ts-ignore
    if (locals.method !== "GET") { response = { ...response, status: 303, headers: { location: "/" } }; }
    return response;
};