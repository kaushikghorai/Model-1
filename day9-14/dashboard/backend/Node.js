var http = require('http');
var fs = require('fs');
http.createrServer((req, res) => {
    res.writeHead(200, {'content-Type':'text/html'});
    if(req.url == "/"){
        fs.readFile('./home.html', (err, data) =>{

