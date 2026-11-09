export const enhance = (form: HTMLFormElement, { result }: { result: (response: Response, form: HTMLFormElement) => void | Promise<void> }) => {

    const submit = async ($event: Event) => {
        const { action, method } = form;
        const body = new FormData(form);
        $event.preventDefault();
        try {
            const response = await fetch(action, { method, body, headers: { accept: "application/json" } });
            if (response.status === 204) { console.info("There is no content to send for this request.")}
            else if (response.ok) { await result(response, form); }
            else { console.error("Could not fetch the data: ", await response.text()); }
        } catch(error) {
            console.error("Could not submit the form: ", error);
        }
    };

    form.addEventListener("submit", submit)

    return {
        destroy() { form.removeEventListener("submit", submit); }
    }
}
