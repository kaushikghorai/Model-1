var http = require('http');
var fs = require('fs');
http.createServer((req, res) => {
    if(req.url == "/"){
        fs.readFile('./sample.html', (err, data) =>{
            if (err) {
                res.writeHead(404, {'Content-Type':'text/html'});
                res.write("<h1>404 File Not Found</h1>");
            } else {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data);
            }
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type':'text/html'});
        res.write("<h1>404 File Not Found</h1>");
        res.end();
    }
}).listen(8081);
