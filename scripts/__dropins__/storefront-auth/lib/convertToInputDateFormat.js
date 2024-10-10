export const convertToInputDateFormat = (dateTimeString) => {
    if (!dateTimeString)
        return '';
    const parts = dateTimeString.split('-');
    if (parts.length < 3) {
        return '';
    }
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
