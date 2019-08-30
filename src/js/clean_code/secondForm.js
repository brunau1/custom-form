var validateCPFdigits = (cpfField) => {
    var cpf = cpfField.value.toString().replace(/\D/g, '')
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

var validateAsyncCPF = async (cpf) => {
    const inputCpf = document.querySelector('#cpf')
    const errorCpf = document.querySelector('#cpf-invalid-feedback')
    errorCpf.style.display = 'none'
    inputCpf.style.borderColor = '#28a745'
    var asyncCpfVerification = () => {
        try {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://abrasel.dj.emp.br/api/users/exists/cf.cpf/${cpf}/`,
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
    const exists = await asyncCpfVerification()
    if (exists) {
        inputCpf.style.borderColor = '#dc3545'
        errorCpf.style.display = 'block'
        errorCpf.innerHTML = 'Este CPF já existe!'
    } else {
        errorCpf.style.display = 'none'
        inputCpf.style.borderColor = '#28a745'
    }
    console.log(`Response result cpf: ${exists}`)
}

var checkDateValidity = () => {
    const inputDate = document.querySelector('#birth_date')
    const errorDate = document.querySelector('#date-invalid-feedback')
    inputDate.addEventListener('change', event => {
        const arrayDate = inputDate.value.toString().split('/')
        const date = {
            'dia': arrayDate[0],
            'mes': arrayDate[1],
            'ano': arrayDate[2]
        }
        var isValid = new Date(date.ano, date.mes, date.dia).getTime() > new Date().getTime() ? false : true
        if (isValid) isValid = date.dia > 31 || date.dia < 1 ? false : true
        if (isValid) isValid = date.mes > 12 || date.mes < 1 ? false : true
        if (isValid) isValid = date.mes == 2 && date.dia > 29 ? false : true
        if (!isValid) {
            inputDate.value = ''
            inputDate.style.borderColor = '#dc3545'
            errorDate.style.display = 'block'
        } else {
            inputDate.style.borderColor = '#28a745'
            errorDate.style.display = 'none'
        }
    })
}

var checkCpfValidity = () => {
    document.querySelector('#cpf').addEventListener('change', event => {
        const inputCpf = document.querySelector('#cpf')
        const errorCpf = document.querySelector('#cpf-invalid-feedback')
        const cpf = inputCpf.value.toString()
        let isValid = inputCpf.validity.valid
        if (!!isValid) isValid = validateCPFdigits(inputCpf)
        if (!isValid) {
            inputCpf.style.borderColor = '#dc3545'
            errorCpf.style.display = 'block'
            errorCpf.innerHTML = 'Informe um CPF válido!'
            inputCpf.validity.valid = false
            document.querySelector("#cpf-error").hidden = true
        } else {
            inputCpf.style.borderColor = '#28a745'
            errorCpf.style.display = 'block'
            validateAsyncCPF(cpf)
        }
    })
}

var consultCep = () => {
    const inputCep = document.querySelector('#zip_code')
    const errorCep = document.querySelector('#cep-invalid-feedback')
    inputCep.addEventListener('change', event => {
        const isValid = inputCep.validity.valid
        if (!!isValid) {
            const cep = inputCep.value.toString().replace(/\D/g, '');
            const response = cepRequest(cep)
            console.log(JSON.stringify(response, null, 2))
        } else if (!isValid) {
            clearCepFields()
            inputCep.style.borderColor = '#dc3545'
            errorCep.style.display = 'block'
            errorCep.innerHTML = 'Formato do CEP inválido!'
        }
    })
}

window.onload = () => {
    checkDateValidity()
    checkCpfValidity()
    consultCep()

    preventPasteEvent(fieldsSecondForm)
    const canShowThirdForm = localStorage.getItem('showThirdForm')
    if (canShowThirdForm == "false") {
        preventSubmitEvent(fieldsSecondForm, '#second_step_button_post', '')
        document.querySelector("#second_step_button_next").hidden = true
        document.querySelector("#second_step_button_post").hidden = false
        document.querySelector('#step2').setAttribute('action', '/etapa-final')
    } else {
        preventSubmitEvent(fieldsSecondForm, '#second_step_button_next', '')
        document.querySelector('#second_step_button_next').hidden = false
        document.querySelector('#second_step_button_post').hidden = true
        document.querySelector('#step2').setAttribute('action', '/terceira-etapa')
    }
    console.log("canShowThirdForm: " + canShowThirdForm)
}

var clearCepFields = () => {
    // Limpa valores do formulário de cep.
    $("#address").val("");
    $("#neighborhood").val("");
    $("#city").val("");
    $("#state").val("");
}

var cepRequest = async (cep) => {
    const inputCep = document.querySelector('#zip_code')
    const errorCep = document.querySelector('#cep-invalid-feedback')
    //Verifica se campo cep possui valor informado.
    var request = () => {
        try {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://viacep.com.br/ws/${cep}/json`,
                    type: 'get',
                })
                    .done(data => {
                        if (!("erro" in data)) {
                            $("#address").val(data.logradouro);
                            $("#neighborhood").val(data.bairro);
                            $("#city").val(data.localidade);
                            $("#state").val(data.uf);
                            resolve({
                                error: false,
                                message: ''
                            })
                        } else {
                            clearCepFields();
                            resolve({
                                error: true,
                                message: 'CEP não encontrado.'
                            })
                        }
                    })
                    .fail(err => {
                        reject(err)
                    });
            })
        } catch (error) { console.log(error) }
    }

    const response = await request()
    if (!!response.error) {
        inputCep.value = ''
        inputCep.style.borderColor = '#dc3545'
        errorCep.style.display = 'block'
        errorCep.innerHTML = response.message
    } else if (!response.error) {
        inputCep.style.borderColor = '#28a745'
        errorCep.style.display = 'none'
    }
}