var postData = {}
var resultCep = {}
var resultCnpj = {}
var stepCounter = document.querySelector('#step-counter')
var formCounter = 1

var fieldsFirstForm = [
    '#user_type', //ok
    '#first_name', //ok
    '#last_name', //ok
    '#username', //ok
    '#email', //ok
    '#password', //ok
    '#phone_number'//ok
]

var fieldsSecondForm = [
    '#cpf', //ok
    '#birth_date', //ok
    '#sex', //ok
    '#cpf_situation', //ok
    '#country', //ok
    '#zip_code', //ok
    '#state', //ok
    '#city', //ok
    '#neighborhood', //ok
    '#address', //ok
    '#number', //ok
    '#complement' //ok
]

var fieldsThirdForm = [
    '#cnpj', //ok
    '#size', //ok
    '#social_name', //ok
    '#fantasy_name', //ok
    '#opening_date', //ok
    '#current_situation', //ok
    '#people', //ok
    '#main_activity' //ok
]

var fieldsCnpj = [
    '#cnpj', //ok
    '#social_name', //ok
    '#opening_date', //ok
    '#current_situation', //ok
    '#main_activity'
]