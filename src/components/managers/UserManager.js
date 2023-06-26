const url = "https://voyageher-server-1164995fc8a4.herokuapp.com/";

export const getAllGuides = () => {
  return fetch(`${url}/guides`).then((res) => res.json());
};

export const getGuideById = (userId) => {
  return fetch(`${url}/guides/${userId}`).then((res) => res.json());
};

export const sendRating = (rating, guide_id) => {
  return fetch(`${url}/guides/${guide_id}/rate-guide`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(rating),
  }).then((res) => res.json());
};

export const getCurrentUser = () => {
  const userId = localStorage.getItem("user_id");
  return fetch(`${url}/users/${userId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const updateUser = (userObj) => {
  const userId = localStorage.getItem("user_id");
  return fetch(`${url}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(userObj),
  });
};
