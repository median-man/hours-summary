import jwtDecode from "jwt-decode";

export const token = {
  // vulnerable technique for persisting token if data from users
  // is ever unsantized. A risk I'm taking since this app will likely
  // never grow into something where data is shared between user accounts
  set: token => localStorage.setItem("time-tracker-api:token", token),
  get: () => localStorage.getItem("time-tracker-api:token"),
  clear: () => localStorage.removeItem("time-tracker-api:token"),
  decode: () => jwtDecode(token.get())
}; // faking the api for now

export const createPunch = punch =>
  new Promise(resolve => setTimeout(resolve, 1000));

export const signup = async credentials => {
  return fetch("http://localhost:3001/auth/signup", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
  // return new Promise(resolve =>
  //   setTimeout(() => {
  //     console.log("TODO: implement post new user");
  //     resolve({});
  //   }, 1000)
  // );
};
export const login = credentials => {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
  // return new Promise(resolve =>
  //   setTimeout(() => {
  //     console.log("TODO: implement time tracker login");
  //     resolve({});
  //   }, 1000)
  // );
};
