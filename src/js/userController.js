let usersRoutePost = 'https://abrasel.dj.emp.br/api/users'

var createUser = () => {
    const {
        username,
        firstname,
        lastname,
        email,
        password,
    } = postData

    const {
        cpf,
        cnpj
    } = postData.cf

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
                'cpf': cpf,
                'cnpj': cnpj
            }
        },
        beforeSend: () => {
            alert("Enviando...")
        }
    })
        .done(data => {
            alert("Usuário Cadastrado!")
            console.log(data)
            setTimeout(function () {
                window.location.href = "https://abrasel.dj.emp.br/login/index.php"
            }, 5000);
        })
        .fail(data => {
            alert("Falha no cadastro do usuário!")
            console.log(data)
        });
}

var setPostData = () => {
    let cpf = document.querySelector("#inputCpf").value.toString()
    let cnpj = document.querySelector("#inputCnpj").value.toString()

    if (!validateFormData()) {
        length = document.querySelector("#inputNameFirst").value.toString().split(' ').length,
            postData = {
                'username': document.querySelector("#inputUserName").value.toString(),
                'firstname': document.querySelector("#inputNameFirst").value.toString().split(' ')[0],
                'password': document.querySelector("#inputPassword").value.toString(),
                'lastname': document.querySelector("#inputNameFirst").value.toString().split(' ')[length - 1],
                'email': document.querySelector("#inputEmailFirst").value.toString(),
                'cf': {
                    'cpf': cpf,
                    'cnpj': cnpj
                }
            }
        console.log(postData.firstname)
        console.log(postData.lastname)
        createUser()
    }
    else {
        alert('Todos os campos devem ser preenchidos corretamente!')
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
//         });
// }