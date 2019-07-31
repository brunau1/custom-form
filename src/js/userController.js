let usersRoutePost = 'https://abrasel.dj.emp.br/api/users'
var message = document.querySelector(".message")

var createUser = () => {

    const { username, firstname, lastname, email, password } = postData
    const { cpf, cnpj,
        cep, dataNascimento, usuarioPerfilCondicional, tipoPessoa,
        sexo, fantasia, pessoaCelular, estabelecimentoRazao, complemento,
        cidade, estado, bairro, numero, pais, endereco, dataAbertura,
        situacaoJuridica, porte, atividadePrincipal, pessoasOcupadas } = postData.cf

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
                'dataNascimento': dataNascimento,
                'usuarioPerfilCondicional': usuarioPerfilCondicional,
                'sexo': sexo,
                'fantasia': fantasia,
                'pessoaCelular': pessoaCelular,
                'estabelecimentoRazao': estabelecimentoRazao,
                'cidade': cidade,
                'estado': estado,
                'bairro': bairro,
                'numero': numero,
                'pais': pais,
                'endereco': endereco,
                'dataAbertura': dataAbertura,
                'situacaoJuridica': situacaoJuridica,
                'porte': porte,
                'atividadePrincipal': atividadePrincipal,
                'pessoasOcupadas': pessoasOcupadas,
                'complemento': complemento,
                'tipoPessoa': tipoPessoa 
            }
        },
        beforeSend: () => {
            //alert("Enviando...")
            message.innerHTML = 'Enviando... aguarde um momento.'
            message.hidden = false
        }
    })
        .done(data => {
            console.log(data)
            console.log(localStorage.getItem("urlDestino"))
            var url = localStorage.getItem("urlDestino")
            // alert("Usuário Cadastrado!")
            message.hidden = true
            message.innerHTML = 'Usuário Cadastrado!'
            message.hidden = false
            // if (url)
            //     window.location.href = localStorage.getItem("urlDestino")
            // else
            //     window.location.href = 'https://abrasel.dj.emp.br/login/index.php'
            setTimeout(() => {
                crateFormAndRedirect()
                message.hidden = true
            }, 2500)
        })
        .fail(data => {
            // alert("Falha no cadastro do usuário!")
            message.hidden = true
            message.innerHTML = 'Falha no cadastro do usuário!'
            message.hidden = false
            console.log("Dados:" + data)
            console.log(data)
            console.log("Resposta JSON:" + data.responseJSON)
            console.log(data.responseJSON)

            setTimeout(() => {
                catchError(data.responseJSON)
            }, 2500)
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

    const querryElement = (id, defaultValue) => document.querySelector(id).value.toString() || defaultValue;

    let dataNascimento = querryElement("#inputDate", "01/01/1900");
    let usuarioPerfilCondicional = querryElement("#inputBusiness", 'empty')
    let sexo = querryElement("#inputSex", 'empty')
    let fantasia = querryElement("#inputFantasyName", 'empty')
    let pessoaCelular = querryElement("#inputPhone", '999999999')
    let estabelecimentoRazao = querryElement("#inputSocialReason", 'empty')

    //outros inputs
    let cidade = querryElement("#inputCity", "empty");
    let estado = querryElement("#inputState", "empty");
    let numero = querryElement("#inputNumber", "empty");
    let pais = querryElement("#inputCountry", "empty");
    let endereco = querryElement("#inputAddress", "empty");
    let bairro = querryElement("#inputNeighborhood", "empty");
    let complemento = querryElement("#inputComplement", "empty");

    let dataAbertura = querryElement("#inputOpeningDate", "empty");
    let situacaoJuridica = querryElement("#inputJuridicSituation", "empty");
    let porte = querryElement("#inputBillingRange", "empty");
    let atividadePrincipal = querryElement("#inputMainActivity", "empty");

    let pessoasOcupadas = querryElement("#inputOccupiedPeople", "empty");
    let tipoPessoa = querryElement("#inputTypePerson", "empty");

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
                    cidade,
                    estado,
                    bairro,
                    numero,
                    pais,
                    endereco,
                    dataAbertura,
                    situacaoJuridica,
                    porte,
                    atividadePrincipal,
                    pessoasOcupadas,
                    complemento,
                    tipoPessoa
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
        message.innerHTML = 'Todos os campos devem ser preenchidos corretamente!'
        message.hidden = false
    }
}

var catchError = (data) => {
    var inputUserName = document.getElementById('inputUserName')
    var errorUserName = document.getElementById('user-name-invalid-feedback')
    var inputEmail = document.getElementById('inputEmailFirst')
    var errorEmail = document.getElementById('email-invalid-feedback')

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
                backToFirst()
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
            backToFirst()
            message.hidden = true
        }, 2500)
    }
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
