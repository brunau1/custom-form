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
                if (url == ('https://cursos.abrasel.com.br/pagina-de-cursos/'))
                    window.location.href = url
                else
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
    const querryElement = (id, defaultValue) => document.querySelector(id).value.toString() || defaultValue;

    let cpf = querryElement("#inputCpf", '99999999999')
    let cnpj = querryElement("#inputCnpj", '99999999999999')
    let cep = querryElement("#inputCep", '99999999')

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
    let tipoPessoa = usuarioPerfilCondicional == 'Dono de bar(es) e/ou restaurante(s)' ? 'pessoa juridica' : 'pessoa fisica'

    //provavelmente serão necessárias mais informações
    if (!validateFormData()) {
        length = document.querySelector("#inputNameFirst").value.toString().split(' ').length,
            postData = {
                username: document.querySelector("#inputUserName").value.toString().replace(' ', ''),
                firstname: document.querySelector("#inputNameFirst").value.toString().split(' ').slice(0, 1),
                password: document.querySelector("#inputPassword").value.toString(),
                lastname: document.querySelector("#inputNameFirst").value.toString().split(' ').slice(1, length),
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
        console.log(JSON.stringify(postData, null, 2))
        createUser()
    }
    else {
        message.innerHTML = 'Todos os campos devem ser preenchidos corretamente!'
        message.hidden = false
    }
}

var catchError = async (data) => {
    var inputUserName = document.getElementById('inputUserName')
    var errorUserName = document.getElementById('user-name-invalid-feedback')
    var inputEmail = document.getElementById('inputEmailFirst')
    var errorEmail = document.getElementById('email-invalid-feedback')
    var tryOtherErrors = false

    const setUsernameError = () => {
        errorUserName.style.display = 'block'
        inputUserName.style.borderColor = '#dc3545'
        inputUserName.value = ''
        inputUserName.disabled = false
    }

    const setEmailError = () => {
        errorEmail.style.display = 'block'
        inputEmail.style.borderColor = '#dc3545'
        inputEmail.value = ''
        inputEmail.disabled = false
    }

    const setMessageText = (text) => {
        message.innerHTML = text
        message.hidden = false
    }

    const testErrors = () => {
        return new Promise((resolve, reject) => {
            if (data) {
                try {
                    if (!!data.message.username && !!data.message.email) {
                        // alert("Nome de usuário inválido!")
                        console.log('nome de usuario e email invalidos')
                        setMessageText('Nome de usuário e email inválidos!')
                        setUsernameError()
                        setEmailError()
                        tryOtherErrors = false
                        setTimeout(() => {
                            message.hidden = true
                            resolve('promise - email and username - resolved')
                        }, 2500)
                    } else tryOtherErrors = true
                } catch (e) {
                    console.log(e)
                    reject(e)
                }
                if (tryOtherErrors) {
                    try {
                        if (!!data.message.username) {
                            // alert("Nome de usuário inválido!")
                            console.log('nome de usuario invalido')
                            setMessageText('Nome de usuário inválido!')
                            setUsernameError()
                            setTimeout(() => {
                                message.hidden = true
                                resolve('promise - username - resolved')
                            }, 2500)
                        }
                    } catch (e) {
                        reject(e)
                    }
                    try {
                        if (!!data.message.email) {
                            // alert("Nome de usuário inválido!")
                            console.log('email invalido')
                            setMessageText('O email informado já existe!')
                            setEmailError()
                            setTimeout(() => {
                                message.hidden = true
                                resolve('promise - email - resolved')
                            }, 2500)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
            }
        })
    }

    const log = await testErrors()
    console.log(log)
    backToFirst()
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