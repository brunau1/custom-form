var validateFormData = () => {
    const select = document.querySelector('#inputBusiness')
    error = false

    if (select.value.toString() == 'pessoa juridica')
        fieldIdsJuridic.map(item => {
            error = fieldValidator(item)
            if (!error)
                return error
        })

    fieldIdsPerson.map(item => {
        error = fieldValidator(item)
        if (!error)
            return error
    })

    fieldIdsAddress.map(item => {
        error = fieldValidator(item)
        if (!error)
            return error
    })

    return error
}

var fieldValidator = (fieldId) => {
    // const select = document.querySelector('#inputBusiness')
    const field = document.querySelector(fieldId).value

    if (!field.disabled) {
        if (fieldId == '#inputPassword')
            if (field.toString().length < 6)
                return true

        if (fieldId == '#inputSex')
            if (field == '')
                return true

        if (fieldId == '#inputEmailFirst')
            if (!validateEmail(field.toString()))
                return true

        // if (fieldId == '#inputOffice') {
        //     if (select.value == '2')
        //         if (field.trim() == "" || field == null)
        //             return true;
        // }

        if (field.trim() == "" || field == null)
            return true
    }
    return false
}
//valida o email

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email))
    return re.test(email);
}

//adiciona mascara de cnpj
function MascaraCNPJ(cnpj) {
    if (mascaraInteiro(cnpj) == false) {
        event.returnValue = false;
    }
    return formataCampo(cnpj, '00.000.000/0000-00', event);
}

//adiciona mascara de cep
function MascaraCep(cep) {
    if (mascaraInteiro(cep) == false) {
        event.returnValue = false;
    }
    return formataCampo(cep, '00.000-000', event);
}

//adiciona mascara de data
function MascaraData(data) {
    if (mascaraInteiro(data) == false) {
        event.returnValue = false;
    }
    return formataCampo(data, '00/00/0000', event);
}

//adiciona mascara ao telefone
function MascaraTelefone(tel) {
    if (mascaraInteiro(tel) == false) {
        event.returnValue = false;
    }
    return formataCampo(tel, '(00) 00000-0000', event);
}

//adiciona mascara ao CPF
function MascaraCPF(cpf) {
    if (mascaraInteiro(cpf) == false) {
        event.returnValue = false;
    }
    return formataCampo(cpf, '000.000.000-00', event);
}

//valida telefone
function ValidaTelefone(tel) {
    exp = /\(\d{2}\)\ \d{4}\-\d{4}/
    if (!exp.test(tel.value))
        alert('Numero de Telefone Invalido!');
}

//valida CEP
// function ValidaCep(cep) {
//     exp = /\d{2}\.\d{3}\-\d{3}/
//     if (!exp.test(cep.value))
//         alert('Numero de Cep Invalido!');
// }

//valida data
function ValidaData(data) {
    exp = /\d{2}\/\d{2}\/\d{4}/
    if (!exp.test(data.value))
        alert('Data Invalida!');
}

//valida o CPF digitado
function ValidarCPF(Objcpf) {
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0, soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado)
        alert('CPF Invalido!');
}

//valida numero inteiro com mascara
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
    }
    return true;
}

//valida o CNPJ digitado
// function ValidarCNPJ(ObjCnpj) {
//     var cnpj = ObjCnpj.value;
//     var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
//     var dig1 = new Number;
//     var dig2 = new Number;

//     exp = /\.|\-|\//g
//     cnpj = cnpj.toString().replace(exp, "");
//     var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

//     for (i = 0; i < valida.length; i++) {
//         dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
//         dig2 += cnpj.charAt(i) * valida[i];
//     }
//     dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
//     dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

//     if (((dig1 * 10) + dig2) != digito)
//         alert('CNPJ Invalido!');

// }

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g
    campoSoNumeros = campo.value.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length

    if (Digitato != 8) { // backspace 
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                || (Mascara.charAt(i) == "/"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
        return true;
    } else {
        return true;
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var checkValidity = () =>{
            return inputEmail.checkValidity() && validateEmail(inputEmail.value.toString())
        }
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        var inputCep = document.getElementById('inputCep')
        var errorCep = document.getElementById('cep-invalid-feedback')
        var inputCnpj = document.getElementById('inputCnpj')
        var errorCnpj = document.getElementById('cnpj-invalid-feedback')
        var inputPassword = document.getElementById('inputPassword')
        var errorPassword = document.getElementById('password-invalid-feedback')
        var inputUserName = document.getElementById('inputUserName')
        var errorUserName = document.getElementById('user-name-invalid-feedback')
        var inputEmail = document.getElementById('inputEmailFirst')
        var errorEmail = document.getElementById('email-invalid-feedback')

        var validate = [...forms]
        // Loop over them and prevent submission

        validate.filter(item => {
            if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'first-step') {
                formCounter = 1
                item.addEventListener('submit', event => {
                    if (item.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        formCounter = 0
                        showSecondForm()
                    }
                    formCounter = 1
                    console.log(formCounter)
                    item.classList.add('was-validated');
                }, false)
            }

            if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'second-step') {
                formCounter = 1
                item.addEventListener('submit', event => {
                    if (item.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        formCounter = 0
                        const buttonNext = document.querySelector('#second-step-button-next')
                        if (voltar == false)
                            buttonNext.click()
                    }
                    console.log(formCounter)
                    item.classList.add('was-validated');
                }, false)
            }
            if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'third-step') {
                formCounter = 1
                item.addEventListener('submit', event => {
                    if (item.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        formCounter = 0
                    }
                    console.log(formCounter)
                    item.classList.add('was-validated');
                }, false)
            }
        });

        if (inputCep)
            inputCep.addEventListener('change', event => {
                if (inputCep.checkValidity() === false || inputCep.value.toString().length < 8) {
                    // event.preventDefault();
                    // event.stopPropagation();
                    errorCep.style.display = 'block'
                    inputCep.style.borderColor = '#dc3545'
                    emptyAddressFields()
                }
                else {
                    errorCep.style.display = 'none'
                    inputCep.style.borderColor = '#28a745'
                    consultCep()
                }
                inputCep.classList.add('was-validated');
            }, false)

        if (inputCnpj)
            inputCnpj.addEventListener('change', event => {
                if (inputCnpj.checkValidity() === false || inputCnpj.value.toString().length < 14) {
                    // event.preventDefault();
                    // event.stopPropagation();
                    errorCnpj.style.display = 'block'
                    inputCnpj.style.borderColor = '#dc3545'
                    emptyCnpjFields()
                }
                else {
                    errorCnpj.style.display = 'none'
                    inputCnpj.style.borderColor = '#28a745'
                    consultCnpj()
                }
                inputCnpj.classList.add('was-validated');
            }, false)

        if (inputPassword)
            inputPassword.addEventListener('change', event => {
                if (inputPassword.checkValidity() === false || inputPassword.value.toString().length < 6) {
                    // event.preventDefault();
                    // event.stopPropagation();
                    document.querySelector('#first-step-button-next').disabled = true
                    errorPassword.style.display = 'block'
                    inputPassword.style.borderColor = '#dc3545'
                }
                else {
                    document.querySelector('#first-step-button-next').disabled = false
                    errorPassword.style.display = 'none'
                    inputPassword.style.borderColor = '#28a745'
                }
                inputPassword.classList.add('was-validated');
            }, false)

        if (inputUserName)
            inputUserName.addEventListener('change', event => {
                if (inputUserName.checkValidity() === false) {
                    // event.preventDefault();
                    // event.stopPropagation();
                    errorUserName.style.display = 'block'
                    inputUserName.style.borderColor = '#dc3545'
                }
                else {
                    errorUserName.style.display = 'none'
                    inputUserName.style.borderColor = '#28a745'
                }
                inputUserName.classList.add('was-validated');
            }, false)

        if (inputEmail)
            inputEmail.addEventListener('change', event => {
                if (inputEmail.checkValidity() === false || !validateEmail(inputEmail.value.toString())) {
                    // event.preventDefault();
                    // event.stopPropagation();
                    document.querySelector('#first-step-button-next').disabled = true
                    errorEmail.style.display = 'block'
                    inputEmail.style.borderColor = '#dc3545'
                }
                else {
                    errorEmail.style.display = 'none'
                    inputEmail.style.borderColor = '#28a745'
                    document.querySelector('#first-step-button-next').disabled = false
                }
                inputEmail.classList.add('was-validated');
            }, false)
    }, false)
})();