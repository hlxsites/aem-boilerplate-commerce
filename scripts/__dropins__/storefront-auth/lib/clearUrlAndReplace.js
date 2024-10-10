export const clearUrlAndReplace = () => {
    let url = new URL(window.location.href);
    let email = url.searchParams.get('email');
    let token = url.searchParams.get('key');
    if (email && token) {
        url.searchParams.delete('email');
        url.searchParams.delete('key');
        window.history.replaceState({}, document.title, url.toString());
    }
};
