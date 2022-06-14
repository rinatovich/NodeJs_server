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


let form = document.forms.register;
form.addEventListener('submit',((event)=>{
    event.preventDefault();
    let data = {}
    data.name = form.elements.username.value;
    data.email = form.elements.email.value;
    data.password = form.elements.password.value;
    let sql = `127.0.0.1:3000/users/add?name=${data.name}&email=${data.email}&password=${data.password}`
    sendD();
}));