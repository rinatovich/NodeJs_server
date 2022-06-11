function SendRequest(r_method, r_path, r_args, r_handler)
{
    //Создаём запрос
    var Request = CreateRequest();

    //Проверяем существование запроса еще раз
    if (!Request)
    {
        return;
    }

    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState == 4)
        {
            //Передаем управление обработчику пользователя
            r_handler(Request);
        }
    }

    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
        r_path += "?" + r_args;

    //Инициализируем соединение
    Request.open(r_method, r_path, true);

    if (r_method.toLowerCase() == "post")
    {
        //Если это POST-запрос

        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос

        //Посылаем нуль-запрос
        Request.send(null);
    }
}

let form = document.forms.register;
form.addEventListener('submit',((event)=>{
    event.preventDefault();
    let data = {}
    data.name = form.elements.name.value;
    data.email = form.elements.email.value;
    data.password = form.elements.password.value;
    let sql = `127.0.0.1:3000/users/add?name=${data.name}&email=${data.email}&password=${data.password}`
    // const xhr = new XMLHttpRequest();
    // let sql = `localhost:3000/users/add?name=${data.name}&email=${data.email}&password=${data.password}`
    // xhr.open("GET", sql);
    // xhr.send()
    // xhr.onload = function() {
    //     if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    //         alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //     } else { // если всё прошло гладко, выводим результат
    //         alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    //     }
    // };
    // xhr.onprogress = function(event) {
    //     if (event.lengthComputable) {
    //         alert(`Получено ${event.loaded} из ${event.total} байт`);
    //     } else {
    //         alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    //     }
    //
    // };
    // xhr.onerror = function() {
    //     alert("Запрос не удался");
    // };



    async function sendD() {

        const fetchResp = await fetch('/users/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let respons = await fetchResp;
        console.log(respons);
    }
    sendD();
}));