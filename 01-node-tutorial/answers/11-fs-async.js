const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "content", "second.txt");

console.log("Writing...");

fs.writeFile(filePath, "Ozzy\n", (err) => {
  if (err) return console.error("Error writing line 1:", err);

  console.log("Line 1 written.");

  fs.writeFile(filePath, "Test\n", { flag: "a" }, (err) => {
    if (err) return console.error("Error writing line 2:", err);

    console.log("Line 2 written.");

    fs.writeFile(filePath, "QA\n", { flag: "a" }, (err) => {
      if (err) return console.error("Error writing line 3:", err);

      console.log("Line 3 written.");
      console.log("Writing completed.")

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return console.error("Error reading file:", err);
        console.log("File Content:\n", data);
      });
    });
  });
});
