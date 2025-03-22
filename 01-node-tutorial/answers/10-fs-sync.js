const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "content", "first.txt");

fs.writeFileSync(filePath, "Ozzy\n");
fs.writeFileSync(filePath, "Test\n", { flag: "a" });
fs.writeFileSync(filePath, "QA\n", { flag: "a" });

console.log("File written successfully!");

const content = fs.readFileSync(filePath, "utf-8");
console.log("File Content:\n", content);