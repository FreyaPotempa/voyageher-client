import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, getSingleEvent } from "../managers/EventManager";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Wrap,
  WrapItem,
  useColorMode,
} from "@chakra-ui/react";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { useUser } from "../../useUser";

export const EventDetail = () => {
  const { colorMode } = useColorMode();
  const { event_id } = useParams();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { userId } = useUser();

  const fetchEvents = () => {
    getSingleEvent(event_id).then((data) => setEvent(data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
  const humanReadable = dateTime.toLocaleString(i18n.resolvedLanguage, options);

  const remainingSpots = event.available_spots - event.attendees?.length;

  return (
    <Container
      borderWidth="1px"
      maxWidth="container.sm"
      bg={colorMode === "light" ? "gray.200" : "gray.600"}
      p="6"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Center>
        <Heading p="2" m="1" fontFamily="Lora">
          {event.title}
        </Heading>
      </Center>
      <Box>
        <Center>
          <Image
            src={event.img_url}
            maxWidth="600px"
            alt="event image"
            borderRadius="lg"
          />
        </Center>
      </Box>
      <Divider />
      <Wrap mt="2">
        <WrapItem>
          <Box>{humanReadable}</Box>
        </WrapItem>
        <WrapItem>
          <Box>
            {event.duration} {t("hours")}
          </Box>
        </WrapItem>
      </Wrap>
      <Box mt="2">
        {t("guide")}: {event.host?.user?.first_name}{" "}
        {event.host?.user?.last_name}
      </Box>
      <Box mt="2">
        {t("details")}:
        <Text p="4" m="2">
          {event.description}
        </Text>
      </Box>
      <Flex>
        <Text p="2">
          {remainingSpots}/{event.available_spots} {t("available-spots")}
        </Text>
        <JoinLeaveButton fetchEvents={fetchEvents} event={event} />
      </Flex>
      {parseInt(event.host?.user?.id) === parseInt(userId) ? (
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
              {t("edit")}
            </Button>
            <Button
              type="button"
              onClick={() =>
                deleteEvent(event.id).then(() => {
                  fetchEvents();
                })
              }
            >
              {t("delete")}
            </Button>
          </ButtonGroup>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};
