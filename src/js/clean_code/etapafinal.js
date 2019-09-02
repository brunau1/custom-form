window.onload = () => {
    const url = localStorage.getItem("urlDestino")

    setTimeout(() => {
        if (url == 'https://cursos.abrasel.com.br/pagina-de-cursos/')
            window.location.href = url
        else
            crateFormAndRedirect()
        message.hidden = true
    }, 3000)

    var crateFormAndRedirect = () => {
        const courseUrl = localStorage.getItem("urlDestino").replace('https://abrasel.dj.emp.br', '');
        const form = document.createElement('#userform');
        const createInput = (attributes) => {
            element = document.createElement('input');
            for (const attribute in attributes)
                element.setAttribute(attribute, attributes[attribute]);
            return element;
        }
        form.appendChild(createInput({ name: 'redirect', value: courseUrl, type: 'hidden' }));
        form.submit();
    }

}