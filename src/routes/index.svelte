<svelte:head>
    <title>{ title }</title>
</svelte:head>

<div id="todos">
    <h1>{ title }</h1>
    <form action="/todos.json" method="POST" id="new">
        <input type="text" name="text" id="text" aria-label="Add a todo~" placeholder="[+] Type to add a something to do~" />
    </form>
    { #each todos as todo }
        <TodoItem todo={todo} />
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

    export let todos: Todo[];

    const title = "Let's do it!";
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
