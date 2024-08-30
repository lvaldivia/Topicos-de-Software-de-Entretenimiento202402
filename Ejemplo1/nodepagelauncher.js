const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request,response)=>{
    /*response.writeHead(200,{"content-type" : "text/html"});
    fs.createReadStream("simplepage.html").pipe(response);*/
    console.log(`serving ${request.url}`);
    switch (request.url) {
        case "/content.txt":
            response.writeHead(200,{"content-type" : "text/plain"});
            fs.createReadStream("content.txt").pipe(response);
            break;
    
        default:
            response.writeHead(200,{"content-type" : "text/html"});
            fs.createReadStream("simplepage.html").pipe(response);
            break;
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
