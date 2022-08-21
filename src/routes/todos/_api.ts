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
            const text = data.get("text")?.toString().trim();
            if (text) {
                todos.push({ uid: `${Date.now()}`, text, done: false, created_at: new Date() });
                response = { ...response, status: 201, body: todos.slice(-1)[0] };
            } else { response = { ...response, status: 204 }; }
            break;
        case "PATCH":
            data = await request.formData();
            const todo = todos.find(todo => todo.uid === uid);
            if (data.has("text")) { 
                // @ts-ignore
                todo.text = data.get("text")?.toString().trim() || todo.text;
                response = { ...response, status: 200, body: { ...todo }}; 
            }
             // @ts-ignore
            if (data.has("done")) { response = { ...response, status: 200, body: { ...todo, done: (todo.done = data.get("done") === "true") }}; }
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== uid);
            response = { ...response, status: 200, body:  todos }
            break;
        default:
            break;
    }
    // @ts-ignore
    if (locals.method !== "GET" && request.headers.get("accept") !== "application/json") { response = { ...response, status: 303, headers: { location: "/" } } }
    console.log(response);
    return response;
};