const os = require('os');
console.log("User info:", os.userInfo());

console.log(`System uptime: ${os.uptime()} seconds`);

const systemInfo = {
    OS_Name: os.type(),
    Release: os.release(),
    Total_Memory: os.totalmem(),
    Free_Memory: os.freemem(),
    CPU_Cores: os.cpus().length
}

console.log("System Info:", systemInfo);
