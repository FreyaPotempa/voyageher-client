const url = "https://voyageher-server-1164995fc8a4.herokuapp.com";

export const getEvents = () => {
  return fetch(`${url}/events`).then((res) => res.json());
};

export const getSingleEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}`).then((res) => res.json());
};

export const createEvent = (newEventObj) => {
  return fetch(`${url}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newEventObj),
  }).then((res) => res.json());
};

export const deleteEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};

export const updateEvent = (eventObj) => {
  return fetch(`${url}/events/${eventObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(eventObj),
  });
};

export const joinEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
};

export const leaveEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}/leave`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};
