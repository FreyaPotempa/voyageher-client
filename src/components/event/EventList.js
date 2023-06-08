import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteEvent,
  getEvents,
  joinEvent,
  leaveEvent,
} from "../managers/EventManager";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { getLocations } from "../managers/LocationManager";

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectEvents, setSelectEvents] = useState([]);

  const sortByCity = (e) => {
    const city = parseInt(e.target.value);
    if (city !== 0) {
      const eventsByCity = events.filter(
        (event) => parseInt(event.location_id) === city
      );
      setSelectEvents(eventsByCity);
    } else {
      setSelectEvents(events);
    }
  };

  const fetchEvents = () => {
    getEvents().then((data) => {
      setEvents(data);
      setSelectEvents(data);
    });
  };

  useEffect(() => {
    fetchEvents();
    getLocations().then((data) => setLocations(data));
  }, []);

  return (
    <>
      <select name="location" onChange={sortByCity}>
        Sort by City
        <option value="0">Select a City</option>
        {locations.map((location) => (
          <option value={location.id}>{location.city}</option>
        ))}
      </select>
      <article className="events">
        {selectEvents.map((event) => {
          console.log("joined", event.attendees);
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event_title">
                <h2>{event.title}</h2>
              </div>
              <div className="event_description">{event.description}</div>
              <div className="event_date">{event.date_time}</div>
              <div className="location">
                {
                  locations.find(
                    (location) => location.id === event.location_id
                  ).city
                }
              </div>
              <JoinLeaveButton event={event} fetchEvents={fetchEvents} />
              {parseInt(event.host?.user?.id) ===
              parseInt(localStorage.getItem("user_id")) ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(`/events/edit/${event.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      deleteEvent(event.id).then(() => {
                        fetchEvents();
                      })
                    }
                  >
                    Delete
                  </button>
                </>
              ) : (
                ""
              )}
            </section>
          );
        })}
      </article>
    </>
  );
};
