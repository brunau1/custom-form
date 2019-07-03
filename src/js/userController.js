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
        cpf
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
                'cpf': cpf
            }
        },
        beforeSend: () => {
            alert("Enviando...")
        }
    })
        .done((msg) => {
            alert("Usuário Cadastrado!")
            console.log(msg)
        })
        .fail((textStatus, msg) => {
            alert("Falha no cadastro do usuário!")
            console.log(textStatus + msg)
        });
}

var setPostData = () => {

    if (!validateFormData()) {
        length = document.querySelector("#inputNameFirst").value.toString().split(' ').length,
            postData = {
                username: document.querySelector("#inputEmailFirst").value.toString().split('@')[0],
                firstname: document.querySelector("#inputNameFirst").value.toString().split(' ')[0],
                password: document.querySelector("#inputPassword").value.toString(),
                lastname: document.querySelector("#inputNameFirst").value.toString().split(' ')[length - 1],
                email: document.querySelector("#inputEmailFirst").value.toString(),
                cf: {
                    cpf: document.querySelector("#inputCpf").value.toString()
                }
            }
        createUser()
    }
    else{
        alert('Todos os campos devem ser preenchidos corretamente!')
    }
}