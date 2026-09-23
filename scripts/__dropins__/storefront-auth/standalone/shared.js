const htmlExampleConfig = {
  URL: 'https://mcstaging.aemshop.net',

  getMeshEndpoint() {
    return `${this.URL}/graphql`;
  },
};

const getCookie = (cookieName) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];

  return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

const getRoute = (identifier) => {
  // Get the current URL without the fragment identifier
  const baseURL = window.location.href.split('#')[0];
  // Append the new fragment identifier
  return `${baseURL}${identifier}`;
}

export { htmlExampleConfig, getCookie, getRoute };
