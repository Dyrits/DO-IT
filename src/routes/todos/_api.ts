import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";

// @TODO: Persist in a database.
export let todos: Todo[] = [];

export const api = async ({ locals, request, params }: RequestEvent) => {
    let response: RequestHandlerOutput = { status: 500 };
    let data: FormData;
    const uid = params?.uid;
    // @ts-ignore
    switch (locals.method) {
        case "GET":
            response = { ...response, status: 200, body: todos };
            break;
        case "POST":
            data = await request.formData();
            const text = data.get("text")?.toString();
            text && todos.push({ uid: `${Date.now()}`, text, done: false, created_at: new Date() });
            response = { ...response, body: text };
            break;
        case "PATCH":
            data = await request.formData();
            const todo = todos.find(todo => todo.uid === uid);
            // @ts-ignore
            response = { ...response, body: (todo.text = data.get("text")?.toString()) };
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== uid);
            break;
        default:
            break;
    }
    // @ts-ignore
    if (locals.method !== "GET") { response = { ...response, status: 303, headers: { location: "/" } }; }
    return response;
};