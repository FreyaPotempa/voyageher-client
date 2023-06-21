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
} from "@chakra-ui/react";
import { JoinLeaveButton } from "./JoinLeaveButton";

export const EventDetail = () => {
  const { event_id } = useParams();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

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
    <Container>
      <Center>
        <Heading>{event.title}</Heading>
      </Center>
      <Box>
        <Image
          src={event.img_url}
          maxWidth="600px"
          alt="event image"
          borderRadius="lg"
        />
      </Box>
      <Divider />
      <Wrap>
        <WrapItem>
          <Box>{humanReadable}</Box>
        </WrapItem>
        <WrapItem>
          <Box>
            {event.duration} {t("hours")}
          </Box>
        </WrapItem>
      </Wrap>
      <Box>
        {t("guide")}: {event.host?.user?.first_name}{" "}
        {event.host?.user?.last_name}
      </Box>
      <Box>
        {t("details")}:{event.description}
      </Box>
      <Flex>
        <Text>
          {remainingSpots}/{event.available_spots} {t("available-spots")}
        </Text>
        <JoinLeaveButton fetchEvents={fetchEvents} event={event} />
      </Flex>
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
