export const getLocations = () => {
  return fetch(`http://localhost:8000/locations`).then((res) => res.json());
};

//TODO: implement this in register for guides
