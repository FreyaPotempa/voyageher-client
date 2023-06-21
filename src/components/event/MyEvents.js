import { useEffect, useState } from "react";
import { getEvents } from "../managers/EventManager";
import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Event } from "./Event";
import { useTranslation } from "react-i18next";

export const MyEvents = () => {
  const { t, i18n } = useTranslation();
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
        <Box height="50" bgColor="blue.200" borderRadius="lg">
          <Center>
            <Heading as="h2" fontFamily="Lora">
              {t("my_events")}
            </Heading>
          </Center>
        </Box>
        <article className="events">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {myEvents.map((myEvent) => {
              return (
                <Event
                  key={myEvent.id}
                  event={myEvent}
                  fetchEvents={fetchEvents}
                />
              );
            })}
          </SimpleGrid>
        </article>
      </Container>
    </>
  );
};
