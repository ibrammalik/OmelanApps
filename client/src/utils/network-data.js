const BASE_URL = "http://localhost:5000";
const ACCESS_TOKEN_KEY = "accessToken";

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function putAccessToken(accessToken) {
  return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
};