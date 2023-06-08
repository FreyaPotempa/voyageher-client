import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents } from "../managers/EventManager";

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <article className="events">
        {events.map((event) => {
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event_title">
                <h2>{event.title}</h2>
              </div>
              <div className="event_description">{event.description}</div>
              <div className="event_date">{event.date_time}</div>
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
