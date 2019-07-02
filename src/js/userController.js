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
            username,
            firstname,
            lastname,
            email,
            password,
            cf: {
                cpf
            }
        },
        beforeSend: () => {
            alert("Enviando...")
        }
    })
        .done((msg) => {
            alert("Usuário Cadastrado!")
        })
        .fail((textStatus, msg) => {
            alert("Falha no cadastro do usuário!")
            console.log(textStatus + msg)
        });
}

var setPostData = () => {

    if (!validateFormData()) {
        length = document.querySelector("#inputName").value.split(' ').length,
        postData = {
            username: document.querySelector("#inputEmail").value.split('@')[0],
            firstname: document.querySelector("#inputName").value.split(' ')[0],
            password: document.querySelector("#inputPassword").value,
            lastname: document.querySelector("#inputName").value.aplit(' ')[length - 1],
            email: document.querySelector("#inputEmail").value,
            cf: {
                cpf: document.querySelector("#inputCpf").value
            }
        }
    }
    createUser()
}