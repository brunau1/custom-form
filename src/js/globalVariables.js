var postData = {}
var resultCep = {}
var resultCnpj = {}
var stepCounter = document.querySelector('#step-counter')
var formTitle = document.querySelector('#form-title')
var formCounter = 1

var fieldIdsJuridic = []
var fieldIdsPerson = []
var fieldIdsAddress = []

var prefix = '#input'

var setFieldsPrefix = (prefix) => {

    fieldIdsJuridic = [
        prefix + 'Cnpj',
        prefix + 'FantasyName',
        prefix + 'BusinessType',
        prefix + 'SocialReason',
        prefix + 'OpeningDate',
        prefix + 'JuridicSituation',
        prefix + 'OccupiedPeople',
        prefix + 'BillingRange',
        prefix + 'Sector',
        prefix + 'EconomicActivity',
        prefix + 'MainActivity'
    ]
    fieldIdsPerson = [
        prefix + 'UserName',
        prefix + 'Business',
        prefix + 'NameFirst',
        //prefix + 'NameSecond',
        prefix + 'Cpf',
        prefix + 'Date',
        prefix + 'Sex',
        prefix + 'PersonalSituation',
        //prefix + 'Office', //só ficará ativo se for profissional da área
        prefix + 'EmailFirst',
        //prefix + 'EmailSecond',
        prefix + 'Password',
        prefix + 'Phone',
        prefix + 'Cpf'
    ]

    fieldIdsAddress = [
        prefix + 'Cep',
        prefix + 'State',
        prefix + 'City',
        prefix + 'Neighborhood',
        prefix + 'Address',
        prefix + 'Number',
        prefix + 'Complement'
    ]

}