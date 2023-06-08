import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEvent,
  getSingleEvent,
  updateEvent,
} from "../managers/EventManager";
import { getLocations } from "../managers/LocationManager";

export const EventForm = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    description: "",
    img_url: "",
    date_time: "",
    duration: 0,
    available_spots: 0,
    location_id: 0,
  });

  useEffect(() => {
    if (event_id) {
      getSingleEvent(event_id).then((eventObj) => setCurrentEvent(eventObj));
    }
    getLocations().then((data) => setLocations(data));
  }, [event_id]);

  const changeEventState = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((currentEvent) => ({ ...currentEvent, [name]: value }));
  };

  return (
    <form className="eventForm">
      <h2>{event_id ? "Edit " : "Create "} Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={currentEvent.title}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="img_url">Image link:</label>
          <input
            type="url"
            name="img_url"
            value={currentEvent.img_url}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="date_time">Date:</label>
          <input
            type="datetime-local"
            name="date_time"
            value={currentEvent.date_time}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            name="duration"
            value={currentEvent.duration}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="available_spots">Total Available Spots:</label>
          <input
            type="number"
            name="available_spots"
            value={currentEvent.available_spots}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="location">Location </label>
          <select name="location_id" onChange={changeEventState}>
            <option value="0">Select Your Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="button"
        onClick={(e) => {
          if (event_id) {
            updateEvent(currentEvent).then(() => navigate("/"));
          } else {
            createEvent(currentEvent).then(() => navigate("/"));
          }
        }}
      >
        {event_id ? "Update" : "Create"}
      </button>
    </form>
  );
};
