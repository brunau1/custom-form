var showBusinessForm = () => {
    const select = document.querySelector('#user_type')
    const totalSteps = document.querySelector('#total-steps')

    if (select.value == 'Dono de bar(es) e/ou restaurante(s)') {
        totalSteps.innerHTML = '3'
        localStorage.setItem('showThirdForm', true)
    } else {
        totalSteps.innerHTML = '2'
        localStorage.setItem('showThirdForm', false)
    }
}

var preventPasteEvent = (fieldGroup) => {
    fieldGroup.forEach(item => {
        const field = document.querySelector(item)
        if (item != '#cnpj' && item != '#zip_code')
            field.addEventListener('paste', event => { event.preventDefault() })
    })
}

var preventSubmitEvent = (fieldGroup, buttonId, checkFieldId) => {
    document.querySelector(buttonId).disabled = true
    fieldGroup.forEach(item => {
        const field = document.querySelector(item)
        if (item != '#cnpj')
            field.addEventListener('change', event => {
                var countFields = 0
                const totalFields = fieldGroup.length
                fieldGroup.forEach(item => {
                    // console.log('campo: ' + item)
                    const testField = document.querySelector(item)
                    if (!!testField.validity.valid) countFields++
                })
                let canSubmit = field.validity.valid && countFields == totalFields ? true : false
                console.log(`Count fields: ${countFields}`)
                console.log(`Total fields: ${totalFields}`)

                if (!!checkFieldId && (field.validity.valid && countFields == totalFields)) {
                    const checkField = document.querySelector(checkFieldId)
                    console.log(`can submit: ${canSubmit}`)
                    if (!!canSubmit) canSubmit = checkField.checked ? true : false
                    console.log(`checkbox checked: ${checkField.checked ? true : false}`)
                    console.log(`can submit: ${canSubmit}`)
                    if (!!document.querySelector('#email') && !!document.querySelector('#username')) {
                        (async () => {
                            if (!!canSubmit) canSubmit = await canPassEmailAndUsername()
                            console.log(`can pass email and username: ${await canPassEmailAndUsername()}`)
                            console.log(`can submit: ${canSubmit}`)

                            console.log(`pode submeter fields: ${canSubmit}`)
                            if (!!canSubmit) document.querySelector(buttonId).disabled = false
                            else document.querySelector(buttonId).disabled = true
                        })()
                    }
                } else {
                    console.log(`pode submeter fields: ${canSubmit}`)
                    if (!!canSubmit) document.querySelector(buttonId).disabled = false
                    else document.querySelector(buttonId).disabled = true
                }
            })
        if (!!checkFieldId) {
            const checkField = document.querySelector(checkFieldId)
            checkField.addEventListener('click', event => {
                var countFields = 0
                const totalFields = fieldGroup.length
                fieldGroup.forEach(item => {
                    // console.log('campo: ' + item)
                    const testField = document.querySelector(item)
                    if (!!testField.validity.valid) countFields++
                })
                let isChecked = checkField.checked && countFields == totalFields ? true : false
                if (!!document.querySelector('#email') && !!document.querySelector('#username'))
                    (async () => {
                        if (!!isChecked) isChecked = await canPassEmailAndUsername()
                        console.log(`can pass email and username: ${await canPassEmailAndUsername()}`)
                        console.log(`pode submeter checkbox: ${isChecked}`)
                        if (!!isChecked) document.querySelector(buttonId).disabled = false
                        else document.querySelector(buttonId).disabled = true
                    })()
                else {
                    console.log(`pode submeter checkbox: ${isChecked}`)
                    if (!!isChecked) document.querySelector(buttonId).disabled = false
                    else document.querySelector(buttonId).disabled = true
                }
            })
        }
    })
}

var canPassEmailAndUsername = async () => {
    const email = document.querySelector("#email").value.toString()
    const username = slugify(document.querySelector("#username").value.toString())

    const existsEmail = await asyncEmailVerification(email)
    const existsUsername = await asyncUsernameVerification(username)

    if (!existsEmail && !existsUsername) return true
    else return false
}

var crateFormAndRedirect = () => {
    const courseUrl = localStorage.getItem("urlDestino").replace('https://abrasel.dj.emp.br', '');
    const form = document.createElement('form');
    const createInput = (attributes) => {
        element = document.createElement('input');
        for (const attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
        return element;
    }
    form.appendChild(createInput({ name: 'username', value: postData.username, type: 'hidden' }));
    form.appendChild(createInput({ name: 'password', value: postData.password, type: 'hidden' }));
    form.appendChild(createInput({ name: 'redirect', value: courseUrl, type: 'hidden' }));
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'https://abrasel.dj.emp.br/login/index.php');
    document.querySelector('body').appendChild(form);
    form.submit();
}

var setRedirectUrl = () => {
    try {
        const redirectUrl = window.location.href.split('?redirect=')[1]
        localStorage.setItem('urlDestino', redirectUrl)
        const courseName = localStorage.urlDestino.split('&').slice(-1).pop().split('=')[1]
        localStorage.setItem("nomeCurso", courseName)
        console.log(`Nome do curso: ${courseName}`)

    } catch (e) {
        console.log('url não encontrada')
    }
}