import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../managers/EventManager";
import { getLocations } from "../managers/LocationManager";
import { getAllGuides } from "../managers/UserManager";
import {
  AbsoluteCenter,
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

  const handleClearFilters = () => {
    setSelectCity(0);
    handleDateChange(null);
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
      <Flex>
        <Container maxW="300px">
          <Box>
            <Box
              m="4"
              width="275px"
              height="290px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg={colorMode === "light" ? "gray.200" : "gray.700"}
              boxShadow="lg"
            >
              <Box p="2">
                <Heading size="md" mb="2" fontFamily="Lora">
                  {t("take-the-road-less-traveled")}
                </Heading>
                <Text size="xs">
                  {t(
                    "voyageher-unlocks-a-world-of-curated-tours-connecting-you-with-local-guides-who-understand-your-unique-perspective-break-barriers-expand-horizons-and-create-unforgettable-memories-with-voyageher"
                  )}
                  <br />
                  <br />
                  {t("lets-redefine-travel-for-women-by-women")}
                </Text>
              </Box>
            </Box>
            <Box
              ml="4"
              width="275px"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading mt="2" align="center" size="sm" fontFamily="Lora">
                {t("where-to")}
              </Heading>
              <Select
                width="275px"
                p="2"
                name="location"
                key={selectCity}
                value={selectCity}
                onChange={sortByCity}
              >
                {t("sort-by-city")}
                <option value={0}>{t("select-a-city")}</option>
                {locations
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
              </Select>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            m="4"
            width="275px"
            height="300px"
            boxShadow="md"
          >
            <Calendar
              selectRange
              onChange={handleDateChange}
              value={dateRange}
              locale={i18n.resolvedLanguage}
            />
          </Box>
          <Button m="2" type="button" onClick={() => handleClearFilters()}>
            {t("see-all")}
          </Button>
        </Container>
        <Container maxW="container.lg" m="4">
          <Box
            bg={colorMode === "light" ? "#0099d6" : "#096e86"}
            position="relative"
            padding="6"
            height="20px"
            borderRadius="lg"
            mb="4"
          >
            <AbsoluteCenter>
              <Heading size="md" fontWeight="bold" fontFamily="Lora">
                {selectCity !== 0
                  ? `${t("destination-events")}`
                  : dateRange !== null
                  ? `${t("events-in-date-range")}`
                  : `${t("coming-up-next")}`}
              </Heading>
            </AbsoluteCenter>
          </Box>
          <article className="events">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {selectEvents.length === 0 ? (
                <Card width="350px" align="center">
                  <CardHeader>
                    <Heading size="md">{t("no-adventures-here")}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      {t(
                        "were-working-on-getting-new-tours-every-day-please-check-back-or-click-below-to-browse-all-events"
                      )}
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button
                      colorScheme="cyan"
                      type="button"
                      onClick={() => {
                        handleClearFilters();
                      }}
                    >
                      {t("see-all")}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                selectEvents.map((event) => (
                  <Event
                    key={event.id}
                    event={event}
                    locations={locations}
                    fetchEvents={fetchEvents}
                  />
                ))
              )}
            </SimpleGrid>
          </article>
        </Container>
      </Flex>
    </>
  );
};
