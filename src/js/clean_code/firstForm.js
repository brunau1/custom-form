var validateAsyncEmail = async () => {
    const inputEmail = document.querySelector('#email')
    const errorEmail = document.querySelector('#email-invalid-feedback')
    var asyncEmailVerification = () => {
        const email = document.querySelector('#email').value.toString()
        try {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://abrasel.dj.emp.br/api/users/exists/email/${email}/`,
                    type: 'get',
                })
                    .done(data => {
                        const exists = data.exists == false ? false : true
                        resolve(exists)
                    })
                    .fail(err => {
                        reject(err)
                    });
            })
        } catch (error) { console.log(error) }
    }
    const exists = await asyncEmailVerification()

    if (exists) {
        errorEmail.style.display = 'block'
        inputEmail.style.borderColor = '#dc3545'
        errorEmail.innerHTML = 'Este email já existe!'
    } else {
        errorEmail.style.display = 'none'
        inputEmail.style.borderColor = '#28a745'
    }
    console.log(`Email já existe: ${exists}`)
}

var validateAsyncUsername = async (username) => {
    const inputUserName = document.querySelector('#username')
    const errorUserName = document.querySelector('#user-name-invalid-feedback')
    var asyncUsernameVerification = () => {
        try {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://abrasel.dj.emp.br/api/users/exists/username/${username}/`,
                    type: 'get',
                })
                    .done(data => {
                        const exists = data.exists == false ? false : true
                        resolve(exists)
                    })
                    .fail(err => {
                        reject(err)
                    });
            })
        } catch (error) { console.log(error) }
    }
    const exists = await asyncUsernameVerification()
    if (exists) {
        errorUserName.style.display = 'block'
        inputUserName.style.borderColor = '#dc3545'
        errorUserName.innerHTML = 'Este nome de usuário já existe!'
    } else {
        errorUserName.style.display = 'none'
        inputUserName.style.borderColor = '#28a745'
    }
    console.log(`Username já existe: ${exists}`)
}

var checkEmailValidity = () => {
    document.querySelector('#email').addEventListener('change', event => {
        const inputEmail = document.querySelector('#email')
        const errorEmail = document.querySelector('#email-invalid-feedback')
        const isValid = inputEmail.value.toString() ? validateEmail(inputEmail.value.toString()) : 'none'
        console.log(`Válido: ${isValid}`)
        if (isValid == 'none') {
            errorEmail.style.display = 'none'
            inputEmail.style.borderColor = '#dc3545'
        }
        else if (!!isValid) validateAsyncEmail()
        else if (!isValid) {
            errorEmail.style.display = 'block'
            inputEmail.style.borderColor = '#dc3545'
            errorEmail.innerHTML = 'Digite um email válido!'
            errorEmail.style.display = 'block'
        } else {
            errorEmail.style.display = 'none'
            inputEmail.style.borderColor = '#28a745'
        }
    })
}

var checkUsernameValidity = () => {
    const inputUsername = document.querySelector('#username')
    inputUsername.value = ''
    document.querySelector('#username').addEventListener('change', event => {
        const username = slugify(inputUsername.value.toString())
        document.querySelector('#username').value = username
        const isValid = username ? true : false
        console.log(`Nome de usuario válido: ${isValid}`)
        if (!!isValid) validateAsyncUsername(username)
        else if (!isValid) inputUsername.style.borderColor = '#dc3545'
    })
}

var checkPhoneValidity = () => {
    document.querySelector('#phone_number').addEventListener('change', event => {
        const inputPhone = document.querySelector('#phone_number')
        const isValid = inputPhone.validity.valid && !!inputPhone.value.toString()
        if (!isValid) inputPhone.style.borderColor = '#dc3545'
        else if (!!isValid) inputPhone.style.borderColor = '#28a745'
    })
}

var checkPasswordValidity = () => {
    document.querySelector('#password').addEventListener('change', event => {
        const inputPassword = document.querySelector('#password')
        const isValid = inputPassword.validity.valid && inputPassword.value.toString().length > 5
        if (!isValid) inputPassword.style.borderColor = '#dc3545'
        else if (!!isValid) inputPassword.style.borderColor = '#28a745'
    }) 
}

window.onload = () => {
    checkEmailValidity()
    checkUsernameValidity()
    checkPasswordValidity()
    checkPhoneValidity()
    preventPasteEvent(fieldsFirstForm)
    preventSubmitEvent(fieldsFirstForm, '#first_step_button_next', '#check_terms')

    const hasRedirect = localStorage.getItem("urlDestino") ? true : false
    if(!hasRedirect) localStorage.setItem("urlDestino", 'https://cursos.abrasel.com.br/pagina-de-cursos/')
    document.querySelector("#login-link").setAttribute('href', localStorage.getItem("urlDestino"))
}