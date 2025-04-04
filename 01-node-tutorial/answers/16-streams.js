const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(`--- Chunk ${chunkCount} ---`);
  console.log(chunk);
});

stream.on("end", () => {
  console.log(`Finished reading. Total chunks: ${chunkCount}`);
});

stream.on("error", (err) => console.error("Stream error:", err));