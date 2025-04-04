const fs = require("fs");
const { writeFile, readFile } = require("fs").promises;

const contentDir = "./content";
const filePath = `${contentDir}/temp.txt`;

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir);
}

writeFile(filePath, "This is line 1\n")
  .then(() => {
    return writeFile(filePath, "This is line 2\n", { flag: "a" });
  })
  .then(() => {
    return writeFile(filePath, "This is line 3\n", { flag: "a" });
  })
  .then(() => {
    return readFile(filePath, "utf8");
  })
  .then((data) => {
    console.log("File content:\n", data);
  })
  .catch((err) => {
    console.log("An error occurred:", err);
  });
