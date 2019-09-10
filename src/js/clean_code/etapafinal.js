window.onload = () => {
    setText()
    const url = localStorage.getItem("urlDestino")

    setTimeout(async () => {
        if (url == 'https://cursos.abrasel.com.br/pagina-de-cursos/')
            window.location.href = url
        else {
            const result = await courseRegister(data.id)
            console.log(result)
            crateFormAndRedirect()
        }
        message.hidden = true
    }, 3000)

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

}

var setText = () => {
    document.querySelector("#form-title").innerHTML = 'Agora você já pode começar os cursos gratuitamente.'
    document.querySelector('#step-counter').innerHTML = '3'
}

var courseRegister = async (userid) => {
    const courseid = await getCourseId()
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://abrasel.dj.emp.br/api/courses/enrol`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            type: 'post',
            json: true,
            data: {
                'userid': userid,
                'courseid': courseid
            }
        })
            .done(data => {
                resolve('success')
            })
            .fail(err => {
                reject(err)
            });
    })
}

var getCourseId = async () => {
    return new Promise(async (resolve, reject) => {
        const courseName = localStorage.getItem("nomeCurso")
        var asyncGetCourse = async () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://abrasel.dj.emp.br/api/courses`,
                    type: 'get',
                })
                    .done(data => {
                        data.data.forEach(item => {
                            if (item.fullname.toLowerCase() == courseName.toLowerCase())
                                resolve(item.id)
                        })
                    })
                    .fail(err => {
                        reject(err)
                    });
            })
        }
        try {
            const courseid = await asyncGetCourse()
            resolve(courseid)
        } catch (error) { reject(error) }
    })
}

var token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FicmFzZWwuZGouZW1wLmJyL2FjY2Vzc190b2tlbiIsImlhdCI6MTU2ODEzNDk3OSwiZXhwIjoxNTY4MTM4NTc5LCJuYmYiOjE1NjgxMzQ5NzksImp0aSI6ImhmNmI3b2dLektnRUlDY3QiLCJzdWIiOjcwOTEsInVzZXIiOnsiaWQiOjcwOTEsImlkbnVtYmVyIjoiIiwidXNlcm5hbWUiOiJrdWthYyIsImZpcnN0bmFtZSI6Ikt1a2FjIiwibGFzdG5hbWUiOiJBZG0iLCJmdWxsbmFtZSI6Ikt1a2FjIEFkbSIsImVtYWlsIjoia3VrYWNAYWRtLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDE5LTA5LTEwIDEyOjEwOjE3IiwiZmlyc3RhY2Nlc3MiOiJOdW5jYSBhY2Vzc291IiwibGFzdGFjY2VzcyI6Ik51bmNhIGFjZXNzb3UifX0.xba7ROOBSKPAJh8FFly2ZYOY_hqIVmlTDHMbudOl6X8`