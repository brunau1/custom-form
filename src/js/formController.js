setFieldsPrefix('#input')

var showBusinessForm = () => {
    const select = document.querySelector('#inputBusiness')
    const businessForm = document.querySelector('#businessForm')
    // const office = document.querySelector('#inputOffice')

    if (select.value == '1')
        businessForm.hidden = false
    else
        businessForm.hidden = true

    // if (select.value == '2')
    //     office.disabled = false
    // else
    //     office.disabled = true
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

            // if (!field.value)
            //     field.disabled = false
            // else
            //     field.disabled = true
        }
    })

    // if (resultCnpj['cep']) {
    //     fieldCep = document.querySelector('#inputCep')
    //     fieldNumber = document.querySelector('#inputNumber')
    //     resultCnpj['cep'] = resultCnpj['cep'].replace('.', '').replace('-', '')

    //     fieldCep.value = resultCnpj['cep']

    //     document.getElementById("buttonCep").click()
    //     fieldNumber.value = resultCnpj['number']

    // if (!fieldCep.value)
    //     fieldCep.disabled = false
    // else
    //     fieldCep.disabled = true

    // if (!fieldNumber.value)
    //     fieldNumber.disabled = false
    // else
    //     fieldNumber.disabled = true
    //}
}

var emptyCnpjFields = () => {

    fieldIdsJuridic.map(item => {

        field = document.querySelector(item)
        field.value = ''

        // if (!field.value)
        //     field.disabled = false
        // else
        //     field.disabled = true
    })
    fieldCep = document.querySelector('#inputCep')
    fieldNumber = document.querySelector('#inputNumber')

    fieldCep.value = ''
    fieldNumber.value = ''

    // fieldCep.disabled = false
    // fieldNumber.disabled = false
    //emptyAddressFields()
}


var fillAddressFields = () => {

    fieldIdsAddress.map(item => {
        if (item != '#inputCep' && item != '#inputNumber') {
            field = document.querySelector(item)
            let data = item.replace('#input', '').toLowerCase()
            field.value = resultCep[data]

            // if (!field.value)
            //     field.disabled = false
            // else
            //     field.disabled = true
        }
    })
}

var emptyAddressFields = () => {

    fieldIdsAddress.map(item => {
        if (item != '#inputCep' && item != '#inputNumber') {
            field = document.querySelector(item)
            field.value = ''

            // if (!field.value)
            //     field.disabled = false
            // else
            //     field.disabled = true
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

    fieldIdsAddress.map(item => {
        error = fieldValidator(item)
        if (!error)
            return error
    })

    return error
}

var fieldValidator = (fieldId) => {
    const select = document.querySelector('#inputBusiness')
    const field = document.querySelector(fieldId).value

    if (fieldId == '#inputPassword')
        if (field.toString().length < 6)
            return true

    if (fieldId == '#inputSex')
        if (field == '')
            return true

    // if (fieldId == '#inputOffice') {
    //     if (select.value == '2')
    //         if (field.trim() == "" || field == null)
    //             return true;
    // }

    if (field.trim() == "" || field == null)
        return true

    return false
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var nameFirst = document.getElementById('inputNameFirst')
        var nameSecond = document.getElementById('inputNameSecond')
        var emailFirst = document.getElementById('inputEmailFirst')
        var emailSecond = document.getElementById('inputEmailSecond')

        if (nameFirst)
            nameFirst.addEventListener('change', event => {
                if (nameFirst.value.toString().length > 0) {
                    nameSecond.value = nameFirst.value
                }
            }, false)

        if (nameSecond)
            nameSecond.addEventListener('change', event => {
                if (nameSecond.value.toString().length > 0) {
                    nameFirst.value = nameSecond.value
                }
            }, false)

        if (emailFirst)
            emailFirst.addEventListener('change', event => {
                if (emailFirst.value.toString().length > 0) {
                    emailSecond.value = emailFirst.value
                } else if (emailSecond.value.toString().length > 0) {
                    emailFirst.value = emailSecond.value
                }
            }, false)

        if (emailSecond)
            emailSecond.addEventListener('change', event => {
                if (emailSecond.value.toString().length > 0) {
                    emailFirst.value = emailSecond.value
                }
            }, false)
    }, false)
})();