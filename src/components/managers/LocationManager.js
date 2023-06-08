const url = "http://localhost:8000";

export const getLocations = () => {
  return fetch(`${url}/locations`).then((res) => res.json());
};

export const getSingleLocation = (locationId) => {
  return fetch(`${url}/locations/${locationId}`).then((res) => res.json());
};

export const createLocation = (newLocationObj) => {
  return fetch(`${url}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLocationObj),
  }).then((res) => res.json());
};
