const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("<h1>Welcome to Ozzy's Home Page</h1>");
  } else if (req.url === "/about") {
    res.end("<h1>About Us</h1><p>This is a simple Node.js server.</p>");
  } else {
    res.writeHead(404);
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
