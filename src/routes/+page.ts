import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/todos.json');
  if (!response.ok) throw new Error('Could not load todos');
  return { todos: await response.json() as Todo[] };
};
