import { useEffect, useState } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
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
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectEvents, setSelectEvents] = useState([]);
  const [selectCity, setSelectCity] = useState(0);
  const [dateRange, setDateRange] = useState(null);

  const sortByCity = (e) => {
    setSelectCity(parseInt(e.target.value));
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const filterEvents = (events) => {
    let filteredEvents = events;
    console.log({ filteredEvents: filteredEvents });

    if (selectCity !== 0) {
      filteredEvents = filteredEvents.filter(
        (event) => parseInt(event.location_id) === selectCity
      );
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      filteredEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.date_time).toISOString().split("T");
        const startDate = dateRange[0].toISOString().split("T")[0];
        const endDate = dateRange[1].toISOString().split("T")[0];
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    setSelectEvents(filteredEvents);
  };

  const fetchEvents = () => {
    getEvents().then((data) => {
      const sortedEvents = data.sort((a, b) => {
        const dateA = new Date(a.date_time);
        const dateB = new Date(b.date_time);
        return dateA - dateB;
      });
      setEvents(sortedEvents);
      filterEvents(sortedEvents);
    });
  };

  useEffect(() => {
    fetchEvents();
    getLocations().then((data) => setLocations(data));
  }, [selectCity, dateRange]);

  return (
    <>
      <Container maxW="container.sm" mt="6">
        <Flex>
          <Select width="200px" mb="2" name="location" onChange={sortByCity}>
            Sort by City
            <option value="0">Select a City</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city}
              </option>
            ))}
          </Select>
          <Container>
            <Calendar
              selectRange
              onChange={handleDateChange}
              value={dateRange}
            />
            <Button type="button" onClick={() => handleDateChange(null)}>
              See All
            </Button>
          </Container>
        </Flex>
        {/* <Select width="200px" name="guide" onChange={sortByGuide}>
          Sort by guide
          <option value="0">Select a Guide</option>
        </Select> */}
        <article className="events">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {selectEvents.map((event) => {
              const isoDateTime = event.date_time;
              const dateTime = new Date(isoDateTime);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };
              const humanReadable = dateTime.toLocaleString(undefined, options);
              const remainingSpots =
                event.available_spots - event.attendees.length;
              return (
                <Card maxW="sm" key={`event--${event.id}`} className="event">
                  <CardBody>
                    <Image
                      src={event.img_url}
                      alt="event image"
                      borderRadius="lg"
                    />
                    <Flex spacing="4">
                      <div className="event_title">
                        <Box>
                          <Heading size="md">{event.title}</Heading>
                        </Box>
                      </div>
                    </Flex>
                    <div className="event_date">
                      {humanReadable} * {event.duration} hours
                    </div>
                    <div className="location">
                      {
                        locations.find(
                          (location) => location.id === event.location_id
                        )?.city
                      }
                    </div>
                    <div className="host">
                      {event.host.rating}
                      Hosted By:{" "}
                      <Link
                        as={ReactLink}
                        color="#0099D6"
                        to={`/guides/${event.host?.id}`}
                      >
                        {event.host?.user?.first_name}{" "}
                        {event.host?.user?.last_name}{" "}
                      </Link>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Text>
                      {remainingSpots}/{event.available_spots} spots available
                    </Text>
                    <JoinLeaveButton event={event} fetchEvents={fetchEvents} />
                    {parseInt(event.host?.user?.id) ===
                    parseInt(localStorage.getItem("user_id")) ? (
                      <>
                        <ButtonGroup
                          variant="outline"
                          spacing="2"
                          size="xs"
                          mt="4"
                          mb="4"
                          ml="2"
                        >
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
                  </CardFooter>
                </Card>
              );
            })}
          </SimpleGrid>
        </article>
      </Container>
    </>
  );
};
