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

window.onload = () => {
    preventPasteEvent(fieldsThirdForm)
    preventSubmitEvent(fieldsThirdForm, '#third_step_button', '')
}