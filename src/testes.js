var catchError = (data) => {
    var inputUserName = document.getElementById('inputUserName')
    var errorUserName = document.getElementById('user-name-invalid-feedback')
    var inputEmail = document.getElementById('inputEmailFirst')
    var errorEmail = document.getElementById('email-invalid-feedback')
    var errors = 0

    if (data) {
        try {
            if (data.message.username || data.message.includes('username')) {
                // alert("Nome de usuário inválido!")
                message.innerHTML = 'Nome de usuário inválido!'
                message.hidden = false

                errorUserName.style.display = 'block'
                inputUserName.style.borderColor = '#dc3545'
                inputUserName.value = ''
                inputUserName.disabled = false

                setTimeout(() => {
                    message.hidden = true
                }, 2500)
            }
        } catch (e) {
            console.log(e)
        }
        if (data.message.email || data.message.includes('email')) {
            // alert("O email informado já existe!")
            message.innerHTML = 'O email informado já existe!'
            message.hidden = false

            errorEmail.style.display = 'block'
            inputEmail.style.borderColor = '#dc3545'
            inputEmail.value = ''
            inputEmail.disabled = false

            setTimeout(() => {
                message.hidden = true
            }, 2500)
        }
        backToFirst()
    }
}