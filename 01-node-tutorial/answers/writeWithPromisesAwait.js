const fs = require("fs");
const { writeFile, readFile } = require("fs").promises;

const contentDir = "./content";
const filePath = `${contentDir}/temp.txt`;

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir);
}

const writer = async () => {
  try {
    await writeFile(filePath, "This is line 1\n");
    await writeFile(filePath, "This is line 2\n", { flag: "a" });
    await writeFile(filePath, "This is line 3\n", { flag: "a" });
  } catch (err) {
    console.log("Error writing file:", err);
  }
};

const reader = async () => {
  try {
    const data = await readFile(filePath, "utf8");
    console.log("File content:\n", data);
  } catch (err) {
    console.log("Error reading file:", err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();