// var inputPorteVerification = document.querySelector('#inputBillingRange')
// inputPorteVerification.addEventListener('click', event => {
//     const porte = inputPorteVerification.value.toString()
//     const isValid = porte == '' ? false : true

//     if (!isValid) {
//         inputPorteVerification.style.borderColor = '#dc3545'
//         document.querySelector('#porte-invalid-feedback').style.display = 'block'
//         console.log('não valido')
//         document.querySelector('#third-step-button').disabled = true
//     }
//     else {
//         inputPorteVerification.style.borderColor = '#28a745'
//         document.querySelector('#porte-invalid-feedback').style.display = 'none'
//     }
// })
var consultCnpj = () => {
    const inputCnpj = document.querySelector('#cnpj')
    const errorCnpj = document.querySelector('#cnpj-invalid-feedback')
    inputCnpj.addEventListener('change', event => {
        const isValid = inputCnpj.validity.valid
        if (!!isValid) {
            const cnpj = inputCnpj.value.toString().replace(/\D/g, '');
            const response = cnpjRequest(cnpj)
            console.log(JSON.stringify(response, null, 2))
        } else if (!isValid) {
            clearCnpjFields()
            inputCnpj.style.borderColor = '#dc3545'
            errorCnpj.style.display = 'inline'
            errorCnpj.innerHTML = 'Formato de CNPJ inválido!'
        }
    })
}

window.onload = () => {
    consultCnpj()
    preventPasteEvent(fieldsThirdForm)
    preventSubmitEvent(fieldsThirdForm, '#third_step_button', '')
}

var clearCnpjFields = () => {
    $("#cnpj").val("");
    $("#social_name").val("");
    $("#opening_date").val("");
    $("#main_activity").val("");
}

var cnpjRequest = async (cnpj) => {
    const inputCnpj = document.querySelector("#cnpj")
    const errorCnpj = document.querySelector('#cnpj-invalid-feedback')

    var request = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
                type: "get",
                dataType: 'jsonp',
                timeout: 6000,
            })
                .done(data => {
                    if (data.status.includes('ERROR')) {
                        console.log(`Data: ${JSON.stringify(data, null, 2)}`)
                        clearCnpjFields()

                        resolve({
                            error: true,
                            message: 'Este CNPJ não existe!'
                        })
                    }
                    else {
                        $("#social_name").val(data.nome);
                        $("#opening_date").val(data.abertura);
                        $("#main_activity").val(data.atividade_principal[0].text);
                        console.log(`Data: ${JSON.stringify(data, null, 2)}`)

                        resolve({
                            error: false,
                            message: ''
                        })
                    }
                })
                .fail(() => {
                    clearCnpjFields()
                    resolve({
                        error: true,
                        message: 'CNPJ inválido!'
                    })
                });
        })
    }
    const response = await request()
    console.log(JSON.stringify(response, null, 2))
    if (!!response.error) {
        inputCnpj.value = ''
        inputCnpj.style.borderColor = '#dc3545'
        errorCnpj.style.display = 'inline'
        errorCnpj.innerHTML = response.message
    } else if (!response.error) {
        inputCnpj.style.borderColor = '#28a745'
        errorCnpj.style.display = 'none'
    }
}