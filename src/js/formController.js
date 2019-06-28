setFieldsPrefix('#input')

var showBusinessForm = () => {
    const select = document.querySelector('#inputBusiness')
    const businessForm = document.querySelector('#businessForm')
    const office = document.querySelector('#inputOffice')

    if (select.value == '1')
        businessForm.hidden = false
    else
        businessForm.hidden = true

    if (select.value == '2')
        office.disabled = false
    else
        office.disabled = true
}

var fillCnpjFields = () => {

    fieldIdsJuridic.map(item => {

        let data = item.replace('#input', '').toLowerCase()
        if (resultCnpj[data]) {
            field = document.querySelector(item)

            if (item == '#inputJuridicSituation')
                field.value = resultCnpj[data].toLowerCase()
            else
                field.value = resultCnpj[data]

            if (!field.value)
                field.disabled = false
            else
                field.disabled = true
        }
    })

    if (resultCnpj['cep']) {
        fieldCep = document.querySelector('#inputCep')
        fieldNumber = document.querySelector('#inputNumber')
        resultCnpj['cep'] = resultCnpj['cep'].replace('.', '').replace('-', '')

        fieldCep.value = resultCnpj['cep']

        document.getElementById("buttonCep").click()
        fieldNumber.value = resultCnpj['number']

        if (!fieldCep.value)
            fieldCep.disabled = false
        else
            fieldCep.disabled = true

        if (!fieldNumber.value)
            fieldNumber.disabled = false
        else
            fieldNumber.disabled = true
    }
}

var fillAddressFields = () => {

    fieldIdsAddress.map(item => {
        if (item != '#inputCep' && item != '#inputNumber') {
            field = document.querySelector(item)
            let data = item.replace('#input', '').toLowerCase()
            field.value = resultCep[data]

            if (!field.value)
                field.disabled = false
            else
                field.disabled = true
        }
    })
}

var validateFormData = () => {
    const select = document.querySelector('#inputBusiness')
    error = false

    if (select.value == 1)
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
    return error
}

var fieldValidator = (fieldId) => {
    const select = document.querySelector('#inputBusiness')
    field = document.querySelector(fieldId).value

    if (fieldId == '#inputPassword')
        if (field.toString().length <= 6)
            return true

    if (fieldId == '#inputSex')
        if (field == '')
            return true

    if (fieldId == '#inputOffice') {
        if (select.value == '2')
            if (field.trim() == "" || field == null)
                return true;
    }

    if (field.trim() == "" || field == null)
        return true

    return false
}