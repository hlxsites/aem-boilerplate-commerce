/**
 * Minimal native fetch wrapper that preserves the response shape
 * expected by accsClient.js and tokenManager.js: { data, status, headers }
 * It replaces the axios library with the native fetch API.
 */

async function httpClient({
  method = "GET",
  url,
  headers = {},
  data,
  validateStatus,
}) {
  console.log(`\n🌐 httpClient: ${method} ${url}`);
  if (data) {
    console.log(`📦 httpClient Request Body:`, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
  }
  console.log(`🔧 httpClient Headers:`, JSON.stringify(headers, null, 2));

  const init = { method, headers };

  if (data !== undefined && data !== null) {
    init.body =
      data instanceof URLSearchParams ? data.toString() : JSON.stringify(data);
  }

  const response = await fetch(url, init);

  console.log(`📥 httpClient Response Status: ${response.status} ${response.statusText}`);

  const shouldReject = validateStatus
    ? !validateStatus(response.status)
    : !response.ok;

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  console.log(`📄 httpClient Response Body:`, typeof body === 'string' ? body : JSON.stringify(body, null, 2));

  if (shouldReject) {
    console.error(`❌ httpClient: Request failed with status ${response.status}`);
    console.error(`❌ httpClient Error Body:`, typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    const error = new Error(`Request failed with status ${response.status}`);
    error.response = {
      status: response.status,
      data: body,
      headers: response.headers,
    };
    throw error;
  }

  console.log(`✅ httpClient: Request successful`);
  
  return {
    data: body,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  };
}

module.exports = httpClient;
