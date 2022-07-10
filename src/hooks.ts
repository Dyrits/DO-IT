import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) => {
    event.locals = { ...event.locals, method: event.url.searchParams.get("_medhod") || event.request.method }
    const response = resolve(event);
    return response;
}