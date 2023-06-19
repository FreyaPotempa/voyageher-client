import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../managers/EventManager";
import { getLocations } from "../managers/LocationManager";
import { getAllGuides } from "../managers/UserManager";
import {
  Avatar,
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
  LightMode,
  Link,
  Select,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { Event } from "./Event";
import { useTranslation } from "react-i18next";

export const EventList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectEvents, setSelectEvents] = useState([]);
  const [selectCity, setSelectCity] = useState(0);
  const [dateRange, setDateRange] = useState(null);
  const { colorMode } = useColorMode();

  const sortByCity = (e) => {
    setSelectCity(parseInt(e.target.value));
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const filterEvents = (events) => {
    let filteredEvents = events;

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

  console.log(i18n.resolvedLanguage);
  return (
    <>
      <Container maxW="container.sm" mt="6">
        <Flex>
          <Select
            width="400px"
            p="2"
            m="4"
            name="location"
            onChange={sortByCity}
          >
            {t("sort-by-city")}
            <option value="0">{t("select-a-city")}</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city}
              </option>
            ))}
          </Select>
          <Box borderWidth="1px" borderRadius="lg" m="4">
            <Calendar
              selectRange
              onChange={handleDateChange}
              value={dateRange}
              locale={i18n.resolvedLanguage}
            />
            <Button type="button" onClick={() => handleDateChange(null)}>
              {t("see-all")}
            </Button>
          </Box>
        </Flex>
        <article className="events">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {selectEvents.map((event) => {
              return (
                <Event
                  key={event.id}
                  event={event}
                  locations={locations}
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
