var showBusinessForm = () => {
    const select = document.querySelector('#user_type')
    const totalSteps = document.querySelector('#total-steps')

    if (select.value == 'Dono de bar(es) e/ou restaurante(s)') {
        totalSteps.innerHTML = '3'
        localStorage.setItem('showThirdForm', true)
    } else {
        totalSteps.innerHTML = '2'
        localStorage.setItem('showThirdForm', false)
    }
}

var preventPasteEvent = (fieldGroup) => {
    fieldGroup.forEach(item => {
        const field = document.querySelector(item)
        if (item != '#cnpj' && item != '#zip_code')
            field.addEventListener('paste', event => { event.preventDefault() })
    })
}

var preventSubmitEvent = (fieldGroup, buttonId, checkFieldId) => {
    fieldGroup.forEach(item => {
        const field = document.querySelector(item)
        if (item != '#cnpj')
            field.addEventListener('change', event => {
                var countFields = 0
                const totalFields = fieldGroup.length
                fieldGroup.forEach(item => {
                    console.log('campo: ' + item)
                    const testField = document.querySelector(item)
                    if (!!testField.validity.valid) countFields++
                })
                let canSubmit = field.value.toString() && countFields == totalFields ? true : false
                console.log(`Count fields: ${countFields}`)
                console.log(`Total fields: ${totalFields}`)
                if (!!checkFieldId && (field.value.toString() && countFields == totalFields)) {
                    const checkField = document.querySelector(checkFieldId)
                    canSubmit = checkField.checked ? true : false
                }
                if (canSubmit) document.querySelector(buttonId).disabled = false
                else document.querySelector(buttonId).disabled = true
            })
        if (!!checkFieldId) {
            const checkField = document.querySelector(checkFieldId)
            checkField.addEventListener('click', event => {
                var countFields = 0
                const totalFields = fieldGroup.length
                fieldGroup.forEach(item => {
                    console.log('campo: ' + item)
                    const testField = document.querySelector(item)
                    if (!!testField.validity.valid) countFields++
                })
                const isChecked = checkField.checked && countFields == totalFields ? true : false
                if (isChecked) document.querySelector(buttonId).disabled = false
                else document.querySelector(buttonId).disabled = true
            })
        }
    })
}