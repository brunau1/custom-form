var consultCep = () => {
    const cep = document.querySelector("#inputCep").value.replace('.', '').replace('-', '')
    const fieldCep = document.querySelector("#inputCep")
    const errorCep = document.querySelector('#cep-invalid-feedback')
 
    fieldCep.disabled = true
    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        type: "get",
        beforeSend: () => {
            fieldIdsAddress.map(item => {
                field = document.querySelector(item)
                field.disabled = true
            })
        }
    })
        .done(data => {
            if (data.erro) {
                errorCep.style.display = 'block'
                fieldCep.style.borderColor = '#dc3545'
                emptyAddressFields()
                fieldCep.disabled = false

                fieldIdsAddress.map(item => {
                    var fields = document.querySelector(item)
                    fields.disabled = false
                })

                return false
            }
            const {
                localidade: city,
                uf: state,
                bairro: neighborhood,
                logradouro: address
                //complemento: complement
            } = data;
            resultCep = {
                city,
                state,
                neighborhood,
                address
                //complement
            };
            console.log(resultCep)
            fillAddressFields()

            fieldIdsAddress.map(item => {
                field = document.querySelector(item)
                field.disabled = false
            })

            fieldCep.disabled = false
        })
        .fail(err => {
            console.log(err)
            errorCep.style.display = 'block'
            fieldCep.style.borderColor = '#dc3545'
            emptyAddressFields()

            fieldIdsAddress.map(item => {
                field = document.querySelector(item)
                field.disabled = false
            })

            fieldCep.disabled = false
        });
}

var consultCnpj = () => {

    const cnpj = document.querySelector("#inputCnpj").value.replace('.', '').replace('.', '').replace('/', '').replace('-', '')
    const fieldCnpj = document.querySelector("#inputCnpj")
    const errorCnpj = document.querySelector('#cnpj-invalid-feedback')

    if (cnpj.length == 14) {
        fieldCnpj.disabled = true
        cnpjRequest(cnpj, fieldCnpj)
    }
    else {
        errorCnpj.style.display = 'block'
        fieldCnpj.style.borderColor = '#dc3545'
    }
}

var cnpjRequest = (cnpj, field) => {
    const fieldCnpj = document.querySelector("#inputCnpj")
    const errorCnpj = document.querySelector('#cnpj-invalid-feedback')

    $.ajax({
        url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
        type: "get",
        dataType: 'jsonp',
        timeout: 6000,
        beforeSend: () => {
            // fieldIdsJuridic.map(item => {
            //     var fields = document.querySelector(item)
            //     fields.disabled = true
            // })
        }
    })
        .done(data => {

            if (data.status.includes('ERROR')) {
                console.log("Data:")
                console.log(data)

                message.innerHTML = 'CNPJ inválido!'
                message.hidden = false

                errorCnpj.style.display = 'block'
                fieldCnpj.style.borderColor = '#dc3545'

                fieldIdsJuridic.map(item => {
                    var fields = document.querySelector(item)
                    fields.disabled = false
                })

                setTimeout(() => {
                    message.hidden = true
                }, 2500)

                field.disabled = false

                document.querySelector('#third-step-button').disabled = true

                emptyCnpjFields()
            }
            else {
                const {
                    nome: socialreason,
                    situacao: juridicsituation,
                    fantasia: fantasyname,
                    abertura: openingdate,
                    atividade_principal: activity,
                    numero: number,
                    cep
                } = data
                try {
                    resultCnpj = {
                        socialreason,
                        juridicsituation,
                        fantasyname,
                        openingdate,
                        mainactivity: activity[0].text,
                        number,
                        cep
                    }
                } catch (e) { console.log(e) }
                console.log("Resultado:")
                console.log(resultCnpj)
                fillCnpjFields()

                fieldIdsJuridic.map(item => {
                    var fields = document.querySelector(item)
                    fields.disabled = false
                })

                field.disabled = false
                document.querySelector('#third-step-button').disabled = false
            }
        })
        .fail((err, statusCode) => {
            console.log(err)
            console.log(statusCode)

            message.innerHTML = 'CNPJ inválido!'
            message.hidden = false

            errorCnpj.style.display = 'block'
            fieldCnpj.style.borderColor = '#dc3545'

            fieldIdsJuridic.map(item => {
                var fields = document.querySelector(item)
                fields.disabled = false
            })

            setTimeout(() => {
                message.hidden = true
            }, 2500)

            field.disabled = false

            emptyCnpjFields()
        });
}