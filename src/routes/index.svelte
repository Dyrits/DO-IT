<svelte:head>
    <title>{ title }</title>
</svelte:head>

<div id="todos">
    <h1>{ title }</h1>
    <form action="#" method="#" id="new">
        <input type="text" name="text" id="text" aria-label="Add a todo~" placeholder="[+] Type to add a something to do~" />
    </form>
    
    <TodoItem />
    <TodoItem />
    <TodoItem />
</div>

<script>
    import TodoItem from "$lib/todo-item.svelte";
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
