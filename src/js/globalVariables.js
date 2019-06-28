var postData = {}
var resultCep = {}
var resultCnpj = {}


var fieldIdsJuridic = []
var fieldIdsPerson = []
var fieldIdsAddress = []

var prefix = '#input'

var setFieldsPrefix = (prefix) => {

    fieldIdsJuridic = [
        prefix + 'Business',
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
        prefix + 'Name',
        prefix + 'Cpf',
        prefix + 'Date',
        prefix + 'Sex',
        prefix + 'PersonalSituation',
        prefix + 'Office', //só ficará ativo se for profissional da área
        prefix + 'Email',
        prefix + 'Password',
        prefix + 'Phone',
        prefix + 'Cpf',
        prefix + 'Phone'
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