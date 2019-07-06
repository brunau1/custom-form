var consultCep = () => {
    const cep = document.querySelector("#inputCep").value.replace('.', '').replace('-', '')
    const fieldCep = document.querySelector("#inputCep")
    const errorCep = document.getElementById('cep-invalid-feedback')
   
    fieldCep.disabled = true
    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        type: "get"
    })
        .done(data => {
            if (data.erro) {
                errorCep.style.display = 'block'
                fieldCep.style.borderColor = '#dc3545'
                emptyAddressFields()
                fieldCep.disabled = false
                return false
            }
            const {
                localidade: city,
                uf: state,
                bairro: neighborhood,
                logradouro: address,
                complemento: complement
            } = data;
            resultCep = {
                city,
                state,
                neighborhood,
                address,
                complement
            };
            console.log(resultCep)
            fillAddressFields()
            fieldCep.disabled = false
        })
        .fail(err => {
            console.log(err)
            emptyAddressFields()
            fieldCep.disabled = false
        });
}

var consultCnpj = () => {

    const cnpj = document.querySelector("#inputCnpj").value.replace('.', '').replace('.', '').replace('/', '').replace('-', '')
    const fieldCnpj = document.querySelector("#inputCnpj")

    if (cnpj.length == 14) {
        fieldCnpj.disabled = true
        cnpjRequest(cnpj, fieldCnpj)
    }
}

var cnpjRequest = (cnpj, field) => {
    $.ajax({
        url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
        type: "get",
        dataType: 'jsonp'
    })
        .done(data => {
            const {
                nome: socialreason,
                situacao: juridicsituation,
                fantasia: fantasyname,
                abertura: openingdate,
                atividade_principal: activity,
                numero: number,
                cep
            } = data;
            resultCnpj = {
                socialreason,
                juridicsituation,
                fantasyname,
                openingdate,
                mainactivity: activity[0].text,
                number,
                cep
            };
            console.log(resultCep)
            fillCnpjFields()
            field.disabled = false
        })
        .fail(err => {
            console.log(err)
            alert("insira um cnpj valido")
            field.disabled = false
        });
}