export const generateRandomDigits = () => {
    let digits = '';
    for (let i = 0; i < 5; i++) {
        digits += Math.floor(Math.random() * 10);
    }
    return digits;
};
