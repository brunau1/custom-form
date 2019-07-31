var postData = {}
var resultCep = {}
var resultCnpj = {}
var stepCounter = document.querySelector('#step-counter')
var voltar = false
var formCounter = 1

var fieldIdsJuridic = []
var fieldIdsPerson = []
var fieldIdsAddress = []

var prefix = '#input'

var setFieldsPrefix = (prefix) => {

    fieldIdsJuridic = [
        prefix + 'Cnpj', //ok
        prefix + 'FantasyName', //ok
        //prefix + 'BusinessType', //removed
        prefix + 'SocialReason', //ok
        prefix + 'OpeningDate', //ok
        prefix + 'JuridicSituation', //ok
        //prefix + 'OccupiedPeople', //ok
        prefix + 'BillingRange', //ok
        //prefix + 'Sector', //removed
        //prefix + 'EconomicActivity', //removed
        prefix + 'MainActivity' //ok
    ]
    fieldIdsPerson = [
        prefix + 'UserName', //ok
        prefix + 'Business', //ok
        prefix + 'NameFirst', //ok
        prefix + 'Cpf', //ok
        prefix + 'Date', //ok
        prefix + 'Sex', //ok
        prefix + 'PersonalSituation',
        prefix + 'EmailFirst', //ok
        prefix + 'Password', //ok
        prefix + 'Phone', //ok
        prefix + 'TypePerson' //ok
    ]

    fieldIdsAddress = [
        prefix + 'Cep', //ok
        prefix + 'State', //ok
        prefix + 'City', //ok
        prefix + 'Neighborhood', //ok
        prefix + 'Address', //ok
        prefix + 'Number', //ok
        //prefix + 'Complement',
        prefix + 'Country' //ok
    ]

}