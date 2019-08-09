setFieldsPrefix('#input')

var showBusinessForm = () => {
    const select = document.querySelector('#inputBusiness')
    const businessForm = document.querySelector('#businessForm')
    const totalSteps = document.querySelector('#total-steps')
    const buttonSubmit = document.querySelector('#second-step-button-post')
    const buttonNext = document.querySelector('#second-step-button-next')
    // const office = document.querySelector('#inputOffice')

    if (select.value == 'Dono de bar(es) e/ou restaurante(s)'){
        businessForm.hidden = false
        totalSteps.innerHTML = '3'
        fieldIdsJuridic.map(item => {
            field = document.querySelector(item)
            field.disabled = false
        })
        buttonNext.hidden = false
        buttonSubmit.hidden = true
    }
    else{
        businessForm.hidden = true
        totalSteps.innerHTML = '2'
        
        fieldIdsJuridic.map(item => {
            field = document.querySelector(item)
            field.disabled = true
        })
        buttonNext.hidden = true
        buttonSubmit.hidden = false
    }
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
        }
    })
}

var emptyCnpjFields = () => {

    fieldIdsJuridic.map(item => {

        field = document.querySelector(item)
        field.value = ''
    })
}


var fillAddressFields = () => {

    fieldIdsAddress.map(item => {
        if (item != '#inputCep' && item != '#inputNumber' && item != '#inputCountry' && item != '#inputComplement') {
            field = document.querySelector(item)
            let data = item.replace('#input', '').toLowerCase()
            field.value = resultCep[data]
        }
    })
}

var emptyAddressFields = () => {

    fieldIdsAddress.map(item => {
        if (item != '#inputCep' && item != '#inputCountry') {
            field = document.querySelector(item)
            field.value = ''
        }
    })
}

var showSecondForm = () => {
    if (formCounter == 0) {
        const secondForm = document.getElementById('second-step')
        const firstForm = document.getElementById('first-step')
        const thirdForm = document.getElementById('third-step')
        secondForm.hidden = false
        firstForm.hidden = true
        thirdForm.hidden = true
        stepCounter.innerHTML = '2'
        voltar = false
    }
}

var showThirdForm = () => {
    if (formCounter == 0) {
        const secondForm = document.getElementById('second-step')
        const thirdForm = document.getElementById('third-step')
        const firstForm = document.getElementById('first-step')
        firstForm.hidden = true
        secondForm.hidden = true
        thirdForm.hidden = false
        showBusinessForm()
        stepCounter.innerHTML = '3'
    }
}

var backToFirst = () => {
    const secondForm = document.getElementById('second-step')
    const thirdForm = document.getElementById('third-step')
    const firstForm = document.getElementById('first-step')
    secondForm.hidden = true
    thirdForm.hidden = true
    firstForm.hidden = false
    stepCounter.innerHTML = '1'
    voltar = true
}

var backToSecond = () => {
    const secondForm = document.getElementById('second-step')
    const thirdForm = document.getElementById('third-step')
    secondForm.hidden = false
    thirdForm.hidden = true
    stepCounter.innerHTML = '2'
}

window.addEventListener('load', function () {
    var nameFirst = document.getElementById('inputNameFirst')
    var nameSecond = document.getElementById('inputNameSecond')

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
}, false)
