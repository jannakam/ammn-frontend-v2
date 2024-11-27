import { getToken } from "./token";

const baseUrl = "http://localhost:8080";

async function getHeaders({ auth = true, contentType = true } = {}) {
  const token = await getToken();
  const headers = new Headers();
  if (contentType) headers.append("Content-Type", "application/json");
  if (auth) headers.append("Authorization", `Bearer ${token}`);

  return headers;
}

export { baseUrl, getHeaders };
