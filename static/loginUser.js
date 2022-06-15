
async function sendD(data) {

    const fetchResp = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let response = await fetchResp.text();
    response = JSON.parse(response);
    if(response.status == 200){
        sessionStorage.setItem('access_token', response.values.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('password',  data.password);
        window.location.href = "/";
    }
    else{
        if(response.status==403){
            alert(response.values.message);
        }
        else{
            alert(response.values.message);
            window.location.href = "/register"
        }
    }
}

let form = document.forms.login;
form.addEventListener('submit',((event)=>{
    event.preventDefault();
    let data = {}
    data.username = form.elements.username.value;
    data.password = form.elements.password.value;
    let sql = `127.0.0.1:3000/users/add?name=${data.name}&password=${data.password}`
    sendD(data);
}));
