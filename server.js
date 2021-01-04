const http = require('http');
const path = require('path');
const fs = require('fs');
const { env } = require('process');
const { publicDecrypt } = require('crypto');
const { extname } = require('path');
const { runInNewContext } = require('vm');
const { ESRCH } = require('constants');

const server = http.createServer((req, res) => {
  console.log(`page requested ${req.url}`)
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : req.url);

  let extname = path.extname(filePath);

  let contentType = 'text/html';
  
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // console.log('file not found');
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        })
      } else {
        // console.log('something is wrong')
        res.writeHead(500);
        res.end('Server Error:'+err.code);
      }
    } else {
      // console.log('sent-successfully');
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

var PORT = process.env.PORT || 8080;
var addr = require('ip')?.address() || 'localhost';

server .listen(PORT, addr, () => {
  console.log('server is running on PORT: '+addr+':'+PORT);
});