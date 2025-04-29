const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.on("bye", (name) => {
  console.log(`Goodbye, ${name}!`);
});

emitter.emit("greet", "Ozzy");
emitter.emit("bye", "Ozzy");

setInterval(() => {
  emitter.emit("heartbeat", "<3");
}, 2000);

emitter.on("heartbeat", (msg) => {
  console.log("Heartbeat event:", msg);
});

const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is:", msg);
};

doWait();
emitter.emit("happens", "Hello World!");