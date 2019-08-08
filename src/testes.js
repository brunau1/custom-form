var validateEmail = async() => {
    var asyncEmailVerification = () => {
        const email = 'teste@gmail.com'
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://abrasel.dj.emp.br/api/users/exists/email/${email}/`,
                type: 'get',
            })
                .done(data => {
                    const exists = data.exists == false ? false : true
                    resolve(exists)
                })
                .fail(err => {
                    reject(err)
                });
        })
    }
    const exists = await asyncEmailVerification()
    console.log(`Response result email: ${exists}`)
}

var validateUsername = async() => {
    var asyncUsernameVerification = () => {
        const username = 'teste'
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://abrasel.dj.emp.br/api/users/exists/username/${username}/`,
                type: 'get',
            })
                .done(data => {
                    const exists = data.exists == false ? false : true
                    resolve(exists)
                })
                .fail(err => {
                    reject(err)
                });
        })
    }    
    const exists = await asyncUsernameVerification()
    console.log(`Response result username: ${exists}`)
}


//____________transforma um array de arrays em um objeto_________________

// var array = [['nome', 'Bruno'],['nome', 'Fael']]
// var obj = {}

// array.forEach(item=>{
//     const [ key, value] = item
//     obj[key] = value
// })

//____________transforma um array de arrays em um objeto_________________
