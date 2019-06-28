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
        cidade,
        estado,

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
                cidade,
                estado,
                cidade,
                estado,
                phone,
                cpf,
                bornDate,
                sex
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
        postData = {
            username: document.querySelector("#inputUserName").value,
            firstname: document.querySelector("#inputFirstName").value,
            password: document.querySelector("#inputPassword").value,
            lastname: document.querySelector("#inputLastName").value,
            email: document.querySelector("#inputEmail").value,
            cf: {
                cidade: document.querySelector("#inputCity").value,
                estado: document.querySelector("#inputState").value,
                phone: document.querySelector("#inputPhone").value,
                cpf: document.querySelector("#inputCpf").value,
            }
        }
        createUser()
    }
}