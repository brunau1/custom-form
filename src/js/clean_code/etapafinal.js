window.onload = async () => {
    setText()
    const url = localStorage.getItem("urlDestino")
    const postData = JSON.parse(document.querySelector("#postData").innerHTML)
    console.log(postData)

    const userid = await createUser(postData)
    setTimeout(() => {
        if (url == 'https://cursos.abrasel.com.br/pagina-de-cursos/')
            window.location.href = url
        else
            (async () => {
                const result = await verifyCourseRegister(userid)
                console.log(result)
                crateFormAndRedirect()
            })()
    }, 3000)
}

var crateFormAndRedirect = () => {
    const courseUrl = localStorage.getItem("urlDestino").replace('https://abrasel.dj.emp.br', '');
    const form = document.createElement('#userform');
    const createInput = (attributes) => {
        element = document.createElement('input');
        for (const attribute in attributes)
            element.setAttribute(attribute, attributes[attribute]);
        return element;
    }
    form.appendChild(createInput({ name: 'redirect', value: courseUrl, type: 'hidden' }));
    form.submit();
}

var setText = () => {
    document.querySelector("#form-title").innerHTML = 'Agora você já pode começar os cursos gratuitamente.'
    document.querySelector('#step-counter').innerHTML = '3'
}

var verifyCourseRegister = async (userid) => {
    console.log('entrou course register')
    const courseid = await getCourseId()
    console.log('voltou para a função verifycourse')
    const result = await awaitRegistration(userid, courseid)
    console.log(`resultado do cadastro: ${result}`)
    return result
}

var awaitRegistration = async (userid, courseid) => {
    console.log('tenta executar o registro')
    try {
        const token = await getToken()
        result = await courseRegister(token, userid, courseid)
        return 'success'
    } catch (error) { await awaitRegistration(userid, courseid) }
}

var courseRegister = (token, userid, courseid) => {
    console.log('entrou course register')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://abrasel.dj.emp.br/api/courses/enrol`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            type: 'post',
            data: {
                userid,
                courseid
            }
        })
            .done(data => {
                console.log(`status code: ${data.status}`)
                console.log('registrou com sucesso')
                resolve({
                    error: false,
                    message: 'success'
                })
            })
            .fail(err => {
                console.log(`erro do ajax: ${JSON.stringify(err, null, 2)}`)
                console.log(`status code: ${err.status}`)
                console.log('nao conseguiu registrar')
                reject({
                    error: true,
                    message: 'fail',
                    status: err.status
                })
            });
    })
}

var getToken = async () => {
    var get = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://abrasel.dj.emp.br/api/access_token`,
                type: 'get',
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                    "password": 'kuk@C1$3',
                    "username": 'kukac',
                },
                data: {
                    "username": "kukac",
                    "password": "kuk@C1$3"
                }
            })
                .done(data => {
                    resolve(data.token)
                })
                .fail(err => {
                    console.log(`erro do ajax: ${JSON.stringify(err, null, 2)}`)
                    reject(err)
                });
        })
    }
    const token = await get()
    return token
}

var getCourseId = async () => {
    console.log('entrou get courses')

    return new Promise(async (resolve, reject) => {
        const courseName = localStorage.getItem("nomeCurso")
        try {
            const courseid = await asyncGetCourses(courseName)
            console.log('id do curso:' + courseid)
            resolve(courseid)
        } catch (error) { reject(error) }
    })
}

var asyncGetCourses = async (courseName) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://abrasel.dj.emp.br/api/courses`,
            type: 'get',
        })
            .done(data => {
                data.data.forEach(item => {
                    console.log("nome curso: " + item.fullname)

                    if (item.fullname.includes(courseName) ||
                        item.shortname.includes(courseName)) {
                        console.log("id no loop: " + item.id)
                        resolve(item.id)
                    }
                })
            })
            .fail(err => {
                reject(err)
            });
    })
}

var createUser = (postData) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://abrasel.dj.emp.br/api/users`,
            type: 'post',
            data: postData,
        })
            .done(data => {
                console.log(`id do usuario: ${data.id}`)
                resolve(data.id)
            })
            .fail(err => {
                console.log("Resposta JSON:" + JSON.stringify(err.responseJSON, null, 2))
                reject('falha no cadastro')
            });
    })
}
