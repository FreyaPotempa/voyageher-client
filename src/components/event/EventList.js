import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteEvent,
  getEvents,
  joinEvent,
  leaveEvent,
} from "../managers/EventManager";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { getLocations } from "../managers/LocationManager";
import { getAllGuides } from "../managers/UserManager";

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectEvents, setSelectEvents] = useState([]);
  const [selectCity, setSelectCity] = useState(0);

  const sortByCity = (e) => {
    setSelectCity(parseInt(e.target.value));
  };

  const fetchEvents = () => {
    getEvents().then((data) => {
      setEvents(data);
      if (selectCity !== 0) {
        const eventsByCity = data.filter(
          (d) => parseInt(d.location_id) === selectCity
        );
        setSelectEvents(eventsByCity);
      } else {
        setSelectEvents(data);
      }
    });
  };

  useEffect(() => {
    fetchEvents();
    getLocations().then((data) => setLocations(data));
  }, [selectCity]);

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
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event_title">
                <h2>{event.title}</h2>
              </div>
              <div className="event_description">
                Description: {event.description}
              </div>
              <div className="event_date"> On: {event.date_time}</div>
              <div className="location">
                {" "}
                In:
                {
                  locations.find(
                    (location) => location.id === event.location_id
                  ).city
                }
              </div>
              <div className="host">
                Hosted By:{" "}
                <Link to={`/guides/${event.host?.id}`}>
                  {event.host?.user?.first_name} {event.host?.user?.last_name}{" "}
                </Link>
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
