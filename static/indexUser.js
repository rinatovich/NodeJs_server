const renderTable = (users,tbody)=>{
    tbody.innerHTML='';
    for(let el in users){
        let temp = `<td><input id='${users[el].id}' name="${users[el].id}" value="${users[el].id}" type="checkbox"></td><td>${users[el].id}</td><td><label for="${users[el].id}">${users[el].username}</label></td><td>${users[el].email}</td><td>${users[el].last_log}</td><td>${users[el].reg_time}</td><td class="${users[el].status}">${users[el].status}</td>`;
        let tr = document.createElement('tr');
        tr.innerHTML = temp;
        tbody.appendChild(tr);
    }
}




async function sendD() {
    if(sessionStorage.access_token){
        const fetchResp = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.access_token,
            },
        });
        let response = await fetchResp.text();
        response = JSON.parse(response);
        let tbody = document.querySelector('#tableBody');
        renderTable(response.values, tbody);
    }
    else{
        window.location.href = "/login";
    }
}

sendD();

let checkAll = document.querySelector('#allChecked');
checkAll.addEventListener("click", ((event)=>{
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((el)=>{
        if(el.checked){
           el.checked = false;
       }
       else{
           el.checked = true;
       }
    });
}));

document.querySelector("#block").addEventListener("click",async (event) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((el) => {
        if (el.checked) {
            checked.push(el.value);
        }
    })
    const fetchResp = await fetch('/api/users/blockuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.access_token,
        },
        body: JSON.stringify({ids: checked, username: sessionStorage.username, password:sessionStorage.password}),
    });
    let response = await fetchResp.text();
    response = JSON.parse(response);
    if(response.status = 200){
        if(response.values.selfblock){
            sessionStorage.setItem('access_token', '');
            window.location.href = "/register"
        }
        sendD();
    }
})

document.querySelector("#unblock").addEventListener("click",async (event) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((el) => {
        if (el.checked) {
            checked.push(el.value);
        }
    })
    const fetchResp = await fetch('/api/users/unblockuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.access_token,
        },
        body: JSON.stringify({ids: checked}),
    });
    let response = await fetchResp.text();
    response = JSON.parse(response);
    if(response.status = 200){
        sendD();
    }
    console.log(response);
})

document.querySelector("#remove").addEventListener("click",async (event) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((el) => {
        if (el.checked) {
            checked.push(el.value);
        }
    })
    const fetchResp = await fetch('/api/users/removeuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.access_token,
        },
        body: JSON.stringify({ids: checked, username: sessionStorage.username, password:sessionStorage.password}),
    });
    let response = await fetchResp.text();
    response = JSON.parse(response);
    console.log(response);
    if(response.status = 200){
        if(response.values.selfblock){
            sessionStorage.setItem('access_token', '');
            window.location.href = "/register"
        }
        sendD();
    }
})

//
// document.querySelector("#remove").addEventListener("click",async (event) => {
//     let checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     let checked = [];
//     checkboxes.forEach((el) => {
//         if (el.checked) {
//             checked.push(el.value);
//         }
//     })
//     const fetchResp = await fetch('/api/users/removeuser', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': sessionStorage.access_token,
//         },
//         body: JSON.stringify({ids: checked}),
//     });
//     let response = await fetchResp.text();
//     response = JSON.parse(response);
//     if(response.status = 200){
//         sendD();
//     }
//     console.log(response);
// })