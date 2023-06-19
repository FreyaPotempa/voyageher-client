import { useEffect, useState } from "react";
import { getEvents } from "../managers/EventManager";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Event } from "./Event";

export const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const userType = localStorage.getItem("user_type");

  const currentUser = parseInt(localStorage.getItem("user_id"));
  const fetchEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    let userEvents = [];
    if (events.length > 0) {
      if (userType === "traveler") {
        userEvents = events.filter((event) =>
          event.attendees.some((attendee) => attendee.user.id === currentUser)
        );
      } else {
        userEvents = events.filter(
          (event) => event.host.user?.id === currentUser
        );
      }
      setMyEvents(userEvents);
    }
  }, [events, currentUser, userType]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Container maxW="container.sm" mt="6">
        <Heading as="h2">My Events</Heading>
        <article className="events">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {myEvents.map((myEvent) => {
              return <Event event={myEvent} fetchEvents={fetchEvents} />;
            })}
          </SimpleGrid>
        </article>
      </Container>
    </>
  );
};
