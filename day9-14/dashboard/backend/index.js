var http = require('http');
http.createServer((req, res)=>{
    res.write("<h1>NodeJS server is running now.</h1>");
    res.write("<p>Silver Oak Rocks.</p>");

    res.end();
}).listen(8081);

