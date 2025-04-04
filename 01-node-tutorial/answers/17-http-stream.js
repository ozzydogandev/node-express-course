const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  const fileStream = fs.createReadStream("./content/big.txt", "utf8");

  fileStream.on("open", () => {
    console.log("Streaming file to client...");
    fileStream.pipe(res);
  });

  fileStream.on("error", (err) => {
    console.error("File stream error:", err);
    res.statusCode = 500;
    res.end("Something went wrong while reading the file.");
  });
}).listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});