const { writeFileSync } = require('fs');

console.log("Generating big.txt file...");

for (let i = 0; i < 10000; i++) {
  writeFileSync('./content/big.txt', `hello world ${i} - ${new Date().toISOString()}\n`, { flag: 'a' });
}

console.log("big.txt generation complete.");