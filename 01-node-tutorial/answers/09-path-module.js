const path = require("path");
console.log("Path separator:", path.sep);

const filePath = path.join("answers", "content", "first.txt");
console.log("File path:" , filePath);

const base = path.basename(filePath);
console.log('Base file name:', base)

const absolute = path.resolve(__dirname, "first.txt");
console.log("Absolute path:", absolute);