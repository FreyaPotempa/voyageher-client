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

export const EventForm = () => {
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
            {event_id ? "Edit " : "Create "} Event
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
                  <FormLabel>Title:</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={currentEvent.title}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description:</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={currentEvent.description}
                    onChange={changeEventState}
                  />
                </FormControl>
                <UploadWidget updateImageUrl={updateImageUrl} />
                <FormControl>
                  <FormLabel>Image:</FormLabel>
                  <Input
                    type="url"
                    name="img_url"
                    placeholder="image url"
                    value={currentEvent.img_url}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Select Date and Time:</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="datetime-local"
                    name="date_time"
                    value={currentEvent.date_time}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Hours of Duration:</FormLabel>
                  <Input
                    type="number"
                    placeholder="Duration"
                    name="duration"
                    value={currentEvent.duration}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Available Spots:</FormLabel>
                  <Input
                    placeholder="Available Spots"
                    type="number"
                    name="available_spots"
                    value={currentEvent.available_spots}
                    onChange={changeEventState}
                  />
                </FormControl>
                <FormControl>
                  <Select name="location_id" onChange={changeEventState}>
                    <option value="0">Select Your Location</option>
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
                  {event_id ? "Update" : "Create"}
                </Button>
              </Stack>
            </form>
          </Container>
        </Stack>
      </Flex>
    </>
  );
};
