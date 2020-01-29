import jwtDecode from "jwt-decode";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://time-tracker-api-v1.herokuapp.com"
    : "http://localhost:3001";

export const token = {
  // vulnerable technique for persisting token if data from users
  // is ever unsantized. A risk I'm taking since this app will likely
  // never grow into something where data is shared between user accounts
  set: token => localStorage.setItem("time-tracker-api:token", token),
  get: () => localStorage.getItem("time-tracker-api:token"),
  clear: () => localStorage.removeItem("time-tracker-api:token"),
  decode: () => {
    try {
      return jwtDecode(token.get());
    } catch (error) {
      return null;
    }
  }
};

export const isLoggedIn = () => {
  const payload = token.decode();
  if (!payload) {
    return false;
  }
  return Date.now() / 1000 < payload.exp;
};

// fake creating a punch
export const createPunch = punch =>
  new Promise(resolve => setTimeout(resolve, 1000));

export const signup = async credentials => {
  return fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
};

export const login = credentials => {
  return fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
};
