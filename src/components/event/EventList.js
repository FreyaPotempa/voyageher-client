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
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Flex,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";

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
      <Select name="location" onChange={sortByCity}>
        Sort by City
        <option value="0">Select a City</option>
        {locations.map((location) => (
          <option value={location.id}>{location.city}</option>
        ))}
      </Select>
      <article className="events">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {selectEvents.map((event) => {
            return (
              <Card maxW="sm" key={`event--${event.id}`} className="event">
                <CardHeader>
                  <Flex spacing="4">
                    <div className="event_title">
                      <Box>
                        <Heading size="md">{event.title}</Heading>
                      </Box>
                    </div>
                  </Flex>
                </CardHeader>
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
                    <ButtonGroup variant="outline" spacing="6" size="xs">
                      <Button
                        colorScheme="blue"
                        type="button"
                        onClick={() => navigate(`/events/edit/${event.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        onClick={() =>
                          deleteEvent(event.id).then(() => {
                            fetchEvents();
                          })
                        }
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </>
                ) : (
                  ""
                )}
              </Card>
            );
          })}
        </SimpleGrid>
      </article>
    </>
  );
};
