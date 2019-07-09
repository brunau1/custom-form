let usersRoutePost = 'https://abrasel.dj.emp.br/api/users'

var createUser = () => {

    const { username, firstname, lastname, email, password } = postData
    const { cpf, cnpj,
        cep, phone, dataNascimento,
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
                'phone': phone,
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
            window.location.href = "https://abrasel.dj.emp.br/login/index.php"
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
    let cpf = document.querySelector("#inputCpf").value.toString()
    let cnpj = document.querySelector("#inputCnpj").value.toString() || ' '
    let cep = document.querySelector("#inputCep").value.toString() || ' '
    let phone = document.querySelector("inputPhone").value.toString() || ' '

    /**
     * Novos campos
     * @ Raphael
     */
    let dataNascimento = document.querySelector("#inputDate").value.toString()
    let usuarioPerfilCondicional = document.querySelector("#inputBusiness").value.toString()
    let sexo = document.querySelector("#inputSex").value.toString()
    let fantasia = document.querySelector("#inputFantasyName").value.toString()
    let pessoaCelular = document.querySelector("#inputPhone").value.toString()
    let estabelecimentoRazao = document.querySelector("#inputSocialReason").value.toString()

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
                    estabelecimentoRazao,
                    phone
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