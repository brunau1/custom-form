var array = [['nome', 'Bruno'],['nome', 'Fael']]
var obj = {}

array.forEach(item=>{
    const [ key, value] = item
    obj[key] = value
})

//transforma um array de arrays em um objeto