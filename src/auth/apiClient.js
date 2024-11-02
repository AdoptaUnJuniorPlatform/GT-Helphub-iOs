import { getToken } from "./authService";

const API_BASE_URL = "http://localhost:4002/api/helphub";

export const apiClient = async (endpoint, method = "GET", data = null) => {
  const token = await getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const options = {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request error");
  }
};
