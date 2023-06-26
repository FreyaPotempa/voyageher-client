const url = "https://voyageher-server-1164995fc8a4.herokuapp.com/";

export const loginUser = (user) => {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const registerUser = (user) => {
  return fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
