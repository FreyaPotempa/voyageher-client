import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  createEvent,
  getSingleEvent,
  updateEvent,
} from "../managers/EventManager";
import { getLocations } from "../managers/LocationManager";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { UploadWidget } from "../../UploadWidget";
import { useTranslation } from "react-i18next";

export const EventForm = () => {
  const { t, i18n } = useTranslation();
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

  const updateImageUrl = (url) => {
    setCurrentEvent((currentEvent) => ({ ...currentEvent, img_url: url }));
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.100"
        justifyContent="center"
      >
        <Stack flexDir="column" mb="2" justifyContent="center">
          <Heading as="h2" size="md">
            {event_id ? `${t("edit")}` : `${t("create")}`} {t("event")}
          </Heading>
          <Container maxW="container.sm">
            <form className="eventForm">
              <Stack
                width="350"
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <FormLabel>{t("title")}:</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    placeholder={t("title")}
                    value={currentEvent.title}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t("description")}:</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    placeholder={t("description")}
                    value={currentEvent.description}
                    onChange={changeEventState}
                  />
                </FormControl>
                <UploadWidget updateImageUrl={updateImageUrl} />
                <FormControl>
                  <FormLabel>{t("image")}:</FormLabel>
                  <Input
                    type="url"
                    name="img_url"
                    placeholder={t("image-url")}
                    value={currentEvent.img_url}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t("select-date-and-time")}:</FormLabel>
                  <Input
                    placeholder={t("select-date-and-time")}
                    type="datetime-local"
                    name="date_time"
                    value={currentEvent.date_time}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t("hours-of-duration")}:</FormLabel>
                  <Input
                    type="number"
                    placeholder={t("duration")}
                    name="duration"
                    value={currentEvent.duration}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t("available-spots")}:</FormLabel>
                  <Input
                    placeholder={t("available-spots")}
                    type="number"
                    name="available_spots"
                    value={currentEvent.available_spots}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <Select name="location_id" onChange={changeEventState}>
                    <option value="0">{t("select-your-location")}</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.city}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="button"
                  colorScheme="cyan"
                  onClick={(e) => {
                    if (event_id) {
                      updateEvent(currentEvent).then(() => navigate("/"));
                    } else {
                      createEvent(currentEvent).then(() => navigate("/"));
                    }
                  }}
                >
                  {event_id ? `${t("update")}` : `${t("create")}`}
                </Button>
              </Stack>
            </form>
          </Container>
        </Stack>
      </Flex>
    </>
  );
};
