let list = {
    //initializing project  with ajax returned data and 'ul' appending on DOM
    init: function () {
        $('#result').on('click', function () {
            if (result.length > 0) {
                alert(result.reduce(function (a, b) {
                    return a + b
                }))
            }
        })
        let result = [];
        let self = this;
        let ul = document.createElement('ul');
        document.body.appendChild(ul)
        $.getJSON('data.json', function (data) {
            for (let i in data.games) {
                for (let j in data.games[i]) {
                    for (let k in data.games[i][j]) {
                        self.appendElem(self, ul, data.games[i][j][k], result)
                    }
                }
            }
        });
    },
    //appending list and casting data inside list
    appendElem: function (self, ul, data, result) {
        let val =1
        let li = document.createElement('li')
        let form = document.createElement('form')
        li.innerHTML = data.question
        li.appendChild(form)
        ul.appendChild(li)
        form.innerHTML = Handlebars.compile(document.getElementById('template').innerHTML)(data)
        form.addEventListener('submit', function (e) {
            e.preventDefault()
            $(this).parent('li').fadeOut(300)
            if (data.correct == ($(form).serializeArray()[0].value)) {
                result.push(1)
            } else { result.push(0) }
        })
    },
}



list.init()



