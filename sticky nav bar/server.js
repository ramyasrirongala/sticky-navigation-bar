const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = '.' + req.url;

  if (filePath === './') {
    // Serve your HTML page with embedded JavaScript
    serveStaticFile(res, './index.html', 'text/html');
  } else if (filePath === './script.js') {
    // Serve your client-side JavaScript
    serveStaticFile(res, filePath, 'application/javascript');
  } else {
    // Serve other static files (CSS, etc.)
    serveStaticFile(res, filePath);
  }
});

function serveStaticFile(res, filePath, contentType = 'application/octet-stream') {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

const port = 3000;
server.listen(port, () => {
  console.log(Server running at http://localhost:${port}/);
});