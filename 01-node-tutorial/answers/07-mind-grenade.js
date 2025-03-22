const generateNumber = () => {
    const randomValue = Math.floor(Math.random() * 100) +1;
    console.log(`Generated random value: ${randomValue}`); 
};

generateNumber();