import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { deleteEvent } from "../managers/EventManager";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Guide } from "../Users/Guide";
import { StarIcon } from "../../images/StarIcon";
import { EventDetail } from "./EventDetail";
import { useUser } from "../../useUser";

export const Event = ({ event, fetchEvents }) => {
  const { t, i18n } = useTranslation();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewLength, setReviewLength] = useState(0);
  const { userId } = useUser();

  const handleLinkClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getGuideRating = (guideRating, guideReviews) => {
    setRating(guideRating);
    setReviewLength(guideReviews);
  };

  const isoDateTime = event.date_time;
  const dateTime = new Date(isoDateTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const humanReadable = dateTime.toLocaleString(i18n.resolvedLanguage, options);
  const remainingSpots = event.available_spots - event.attendees.length;
  return (
    <Card maxW="sm" key={`event--${event.id}`} className="event" boxShadow="md">
      <CardBody>
        <Image src={event.img_url} alt="event image" borderRadius="lg" />
        <Divider />
        <Box m="2">
          <Box display="flex" alignItems="center">
            <StarIcon color={colorMode === "light" ? "#096e86" : "white"} />
            {"  "} {rating?.toFixed(1)}
            <Center ml="2" height="20px">
              <Divider orientation="vertical" />
            </Center>
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              <div>
                {" "}
                {event.duration} {t("hours")}
              </div>
            </Box>
          </Box>
        </Box>
        <Flex spacing="4">
          <div className="event_title">
            <Box>
              <Link as={ReactLink} to={`./eventDetails/${event.id}`}>
                <Heading size="md">{event.title}</Heading>
              </Link>
            </Box>
          </div>
        </Flex>
        <Text className="location" fontWeight="bold">
          {event.location.city}
        </Text>
        <div className="event_date">{humanReadable}</div>
        <div className="host">
          {t("guide")}:{" "}
          <Link as={ReactLink} color="#0099D6" onClick={handleLinkClick}>
            {event.host?.user?.first_name} {event.host?.user?.last_name}
          </Link>
          <Guide
            guide_id={event.host?.id}
            isOpen={isModalOpen}
            onClose={closeModal}
            getGuideRating={getGuideRating}
          />
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>
          {remainingSpots}/{event.available_spots} {t("available-spots")}
        </Text>
        <JoinLeaveButton event={event} fetchEvents={fetchEvents} />
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
      </CardFooter>
    </Card>
  );
};
