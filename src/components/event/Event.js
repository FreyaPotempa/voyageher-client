import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { deleteEvent } from "../managers/EventManager";
import { useTranslation } from "react-i18next";

export const Event = ({ event, fetchEvents }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
  const remainingSpots = event.available_spots - event.attendees.length;
  return (
    <Card maxW="sm" key={`event--${event.id}`} className="event">
      <CardBody>
        <Image src={event.img_url} alt="event image" borderRadius="lg" />
        <Flex spacing="4">
          <div className="event_title">
            <Box>
              <Heading size="md">{event.title}</Heading>
            </Box>
          </div>
        </Flex>
        <div className="event_date">{humanReadable}</div>
        <div>
          {" "}
          {event.duration} {t("hours")}
        </div>
        <div className="location">{event.location.city}</div>
        <div className="host">
          {event.host.rating}
          <Link as={ReactLink} color="#0099D6" to={`/guides/${event.host?.id}`}>
            <Avatar
              size="md"
              m="1.5"
              name={event.host?.user?.first_name}
              src={event.host?.img}
            />
          </Link>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>
          {remainingSpots}/{event.available_spots} {t("available-spots")}
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
      </CardFooter>
    </Card>
  );
};
