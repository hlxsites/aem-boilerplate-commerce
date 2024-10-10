export const validationUniqueSymbolsPassword = (password, uniqueSymbolsCount) => {
    if (uniqueSymbolsCount <= 1)
        return true;
    const numbers = /[0-9]/.test(password) ? 1 : 0;
    const lowerCaseLetter = /[a-z]/.test(password) ? 1 : 0;
    const upperCaseLetter = /[A-Z]/.test(password) ? 1 : 0;
    const specialSymbols = /[^a-zA-Z0-9\s]/.test(password) ? 1 : 0;
    return (numbers + lowerCaseLetter + upperCaseLetter + specialSymbols >=
        uniqueSymbolsCount);
};
