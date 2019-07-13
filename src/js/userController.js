let usersRoutePost = 'https://abrasel.dj.emp.br/api/users'

var createUser = () => {

    const { username, firstname, lastname, email, password } = postData
    const { cpf, cnpj,
        cep, dataNascimento,
        usuarioPerfilCondicional,
        sexo, fantasia, pessoaCelular,
        estabelecimentoRazao } = postData.cf

    $.ajax({
        url: usersRoutePost,
        type: "post",
        data: {
            'username': username,
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
            'cf': {
                'CPF': cpf,
                'CNPJ': cnpj,
                'CEP': cep,
                /**
                 * Novos inputs na request 
                 * @ Raphael
                 */
                'dataNascimento': dataNascimento,
                'usuarioPerfilCondicional': usuarioPerfilCondicional,
                'sexo': sexo,
                'fantasia': fantasia,
                'pessoaCelular': pessoaCelular,
                'estabelecimentoRazao': estabelecimentoRazao
            }
        },
        beforeSend: () => {
            alert("Enviando...")
        }
    })
        .done(data => {
            alert("Usuário Cadastrado!")
            console.log(data)
            window.location.href = localStorage.getItem("urlDestino")
        })
        .fail(data => {
            alert("Falha no cadastro do usuário!")
            console.log(data)
            console.log(data.responseJSON)

            catchError(data.responseJSON)
        })
}

var setPostData = () => {
    /* add dataNascimento, usuarioPerfilCondicional, sexo, fantasia, pessoaCelular, estabelecimentoRazao */
    let cpf = document.querySelector("#inputCpf").value.toString() || '99999999999'
    let cnpj = document.querySelector("#inputCnpj").value.toString() || '99999999999999'
    let cep = document.querySelector("#inputCep").value.toString() || '99999999'

    /**
     * Novos campos
     * @ Raphael
     */
    let dataNascimento = document.querySelector("#inputDate").value.toString() || '01/01/1900'
    let usuarioPerfilCondicional = document.querySelector("#inputBusiness").value.toString() || 'empty'
    let sexo = document.querySelector("#inputSex").value.toString() || 'empty'
    let fantasia = document.querySelector("#inputFantasyName").value.toString() || 'empty'
    let pessoaCelular = document.querySelector("#inputPhone").value.toString() || '999999999'
    let estabelecimentoRazao = document.querySelector("#inputSocialReason").value.toString() || 'empty'

    //provavelmente serão necessárias mais informações
    if (!validateFormData()) {
        length = document.querySelector("#inputNameFirst").value.toString().split(' ').length,
            postData = {
                username: document.querySelector("#inputUserName").value.toString().replace(' ', ''),
                firstname: document.querySelector("#inputNameFirst").value.toString().split(' ')[0],
                password: document.querySelector("#inputPassword").value.toString(),
                lastname: document.querySelector("#inputNameFirst").value.toString().split(' ')[length - 1],
                email: document.querySelector("#inputEmailFirst").value.toString(),
                cf: {
                    cpf,
                    cnpj,
                    cep,
                    dataNascimento,
                    usuarioPerfilCondicional,
                    sexo,
                    fantasia,
                    pessoaCelular,
                    estabelecimentoRazao
                }
            }
        console.log(postData.firstname)
        console.log(postData.lastname)
        console.log(postData.username)
        console.log(postData.password)
        console.log(postData.email)
        createUser()
    }
    else {
        alert('Todos os campos devem ser preenchidos corretamente!')
    }
}

var catchError = (data) => {
    var inputUserName = document.getElementById('inputUserName')
    var errorUserName = document.getElementById('user-name-invalid-feedback')
    var inputEmail = document.getElementById('inputEmailFirst')
    var errorEmail = document.getElementById('email-invalid-feedback')

    if (data.message.email) {
        alert("O email informado já existe!")
        errorEmail.style.display = 'block'
        inputEmail.style.borderColor = '#dc3545'
        inputEmail.value = ''
        inputEmail.disabled = false
        backToFirst()
    }
    if (data.message.username) {
        alert("O nome de usuário informado já existe!")
        errorUserName.style.display = 'block'
        inputUserName.style.borderColor = '#dc3545'
        inputUserName.value = ''
        inputUserName.disabled = false
        backToFirst()
    }
}

// var testUsername = () => {
//     var inputUserName = document.getElementById('inputUserName')
//     var errorUserName = document.getElementById('user-name-invalid-feedback')
//     var username = inputUserName.value.toString().replace(' ', '')

//     inputUserName.disabled = true
//     $.ajax({
//         url: `https://abrasel.dj.emp.br/api/exists/username/jonny/`,
//         type: "get"
//     })
//         .done(data => {
//             if (data.exists) {
//                 errorUserName.style.display = 'block'
//                 inputUserName.style.borderColor = '#dc3545'
//                 inputUserName.value = ''
//                 inputUserName.disabled = false
//                 return true
//             }
//             else {
//                 inputUserName.value = username
//                 inputUserName.disabled = false
//                 return false
//             }
//         })
//         .fail(err => {
//             console.log(err)
//             inputUserName.value = ''
//             inputUserName.disabled = false
//             return true
//         })
// }