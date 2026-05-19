let redirectsPromise = null;

function normalize(term) {
  return term.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function preloadSearchRedirects() {
  if (!redirectsPromise) {
    redirectsPromise = fetch('/search-redirects.json')
      .then((res) => {
        if (!res.ok) return new Map();
        return res.json();
      })
      .then((json) => {
        if (!Array.isArray(json?.data)) return new Map();
        return new Map(
          json.data
            .filter((row) => row['Search Term'] && row['Destination URL'])
            .map((row) => [normalize(row['Search Term']), row['Destination URL']]),
        );
      })
      .catch(() => new Map());
  }
  return redirectsPromise;
}

export async function getSearchRedirectDestination(term) {
  if (!term) return null;
  const map = await preloadSearchRedirects();
  return map.get(normalize(term)) ?? null;
}
