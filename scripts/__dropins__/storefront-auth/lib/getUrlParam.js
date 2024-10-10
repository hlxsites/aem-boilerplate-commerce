export const getUrlParam = (url, param) => {
    const result = url
        .split('&')
        .filter(el => el.includes(param))
        .map(item => {
        return item.split('=')[1];
    });
    return result[0];
};
