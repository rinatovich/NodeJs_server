async function sendD(data) {

    const fetchResp = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let response = await fetchResp.text();
    response = JSON.parse(response);
    if(response.status==200){
        sessionStorage.setItem('access_token', response.values.token);
        window.location.href = "/";
    }
}


let form = document.forms.register;
form.addEventListener('submit',((event)=>{
    event.preventDefault();
    let data = {}
    data.username = form.elements.username.value;
    data.email = form.elements.email.value;
    data.password = form.elements.password.value;
    sendD(data);
}));