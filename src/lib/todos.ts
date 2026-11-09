import type { RequestEvent } from '@sveltejs/kit';

// Tutorial-only process memory, shared across visitors and lost on restart.
let todos: Todo[] = [];

export async function api({ request, params, url }: RequestEvent): Promise<Response> {
  const override = url.searchParams.get('_method');
  const method = request.method === 'POST' && ['PATCH', 'DELETE'].includes(override || '')
    ? override : request.method;
  if ((!params.uid && method !== 'GET' && method !== 'POST') || (params.uid && method !== 'PATCH' && method !== 'DELETE')) {
    return new Response(null, { status: 405 });
  }
  let status = 200;
  let body: Todo | Todo[] | null = null;
  const uid = params.uid;
  switch (method) {
    case 'GET': body = todos; break;
    case 'POST': {
      const data = await request.formData();
      const text = data.get('text')?.toString().trim();
      if (!text) return request.headers.get('accept') === 'application/json'
        ? new Response(null, { status: 204 })
        : new Response(null, { status: 303, headers: { location: '/' } });
      const todo = { uid: crypto.randomUUID(), text, done: false, created_at: new Date() };
      todos.push(todo); body = todo; status = 201; break;
    }
    case 'PATCH': {
      const todo = todos.find(todo => todo.uid === uid);
      if (!todo) return Response.json({ message: 'Todo not found' }, { status: 404 });
      const data = await request.formData();
      if (data.has('text')) todo.text = data.get('text')?.toString().trim() || todo.text;
      if (data.has('done')) todo.done = data.get('done') === 'true';
      body = todo; break;
    }
    case 'DELETE': todos = todos.filter(todo => todo.uid !== uid); body = todos; break;
    default: return new Response(null, { status: 405, headers: { Allow: 'GET, POST, PATCH, DELETE' } });
  }
  if (method !== 'GET' && request.headers.get('accept') !== 'application/json') {
    return new Response(null, { status: 303, headers: { location: '/' } });
  }
  return Response.json(body, { status });
}
