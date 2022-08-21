<svelte:head>
    <title>{ title }</title>
</svelte:head>

<div id="todos">
    <h1>{ title }</h1>
    <form action="/todos.json" method="post" id="new" use:enhance={{ result: addTodo }}>
        <input type="text" name="text" id="text" aria-label="Add a todo~" placeholder="[+] Type to add a something to do~" />
    </form>
    { #each todos as todo }
        <TodoItem { todo } { deleteTodo } { updateTodoText } { updateTodoDone } />
    { /each }
</div>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({ fetch }) => {
        const response = await fetch("/todos.json");
        if (response.ok) { 
            const todos = await response.json(); 
            return { props: { todos },  }
        }
        const { message } = await response.json();
        return { error: new Error(message) };
    }
</script>

<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";
    import { enhance } from "$lib/actions/form";

    export let todos: Todo[];

    const title = "Do it!";

    const addTodo = async (response: Response, form: HTMLFormElement) => {
            const todo = await response.json();
            todos = [...todos, todo];
            form.reset();
    };

    const deleteTodo = async (response: Response) => {
        todos = await response.json();
    }

    const updateTodoText = async (response: Response) => {
        const { uid, text } = await response.json();
        todos = todos.map(todo => uid === todo.uid ? { ...todo, text } : todo);
    }

    const updateTodoDone = async (response: Response) => {
        const { uid, done } = await response.json();
        todos = todos.map(todo => uid === todo.uid ? { ...todo, done } : todo);
    }

</script>

<style>
    h1 { margin-bottom: 1rem; }
    
    #todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto;
    }

    #new { margin: 0 0 0.5rem 0; }

    #new input {
        background: #ffffff0D;
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
    }

    #todos :global(input) {
        border: 1px solid transparent;
        border-radius: 10px;
        outline: none;
    }

    #todos :global(input:focus-visible) { border: 2px solid #8F8F8F; }
</style>


