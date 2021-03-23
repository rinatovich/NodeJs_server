const http = require('http');


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node js basis</title>
	<link rel = 'stylesheet' href= 'index.css'>
</head>
<body>
    <h1>Node JS Basis</h1>
    <button>Press me</button>

	<script src='index.js'></script>npm 
</body>
</html>
`
const css = `
body{
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}
h1{
    text-align: center;
    background-color: rgb(247, 230, 0);
    color: rgba(0,0,0,1)
}
button{
    margin: 10px auto;
}
`
const js = `
let btn = document.querySelector('button');
btn.addEventListener('click',()=>{
	alert('u clicked');
})
`
http.createServer((req,res)=>{
	switch (req.url){
		case '/':
			res.writeHead(200, { 'Content-Type': 'text/html'})
			res.end(html);
		case '/index.css':
			res.writeHead(200, { 'Content-Type': 'text/css'})
			res.end(css);
		case '/index.js':
			res.writeHead(200, { 'Content-Type': 'text/javascript'})
			res.end(js);
		default:
			res.writeHead(404, { 'Content-Type': 'text/plain'})
			res.end('Page not found');
	}

}).listen(3000, ()=>{
	console.log('Server is working');
});