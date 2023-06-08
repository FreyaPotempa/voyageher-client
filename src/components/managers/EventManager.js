const url = "http://localhost:8000";

export const getEvents = () => {
  return fetch(`${url}/events`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getSingleEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
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
