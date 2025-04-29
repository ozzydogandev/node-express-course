const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let selectedColor = "white";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${selectedColor};">
  <h1>Background Color Selection</h1>
  <form method="POST">
    <label for="color">Choose a color:</label>
    <select name="color">
      <option value="white">White</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
    </select>
    <button type="submit">Update</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("Received form data:", body);
      
      if (body["color"]) {
        selectedColor = body["color"];
      }
      
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("Server is running on port 3000. Visit http://localhost:3000 to access.");