import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { joinEvent, leaveEvent } from "../managers/EventManager";
import { useTranslation } from "react-i18next";

export const JoinLeaveButton = ({ event, fetchEvents }) => {
  const { t, i18n } = useTranslation();
  if (localStorage.getItem("user_type") === "traveler") {
    const isAttendee = event.attendees?.find(
      (attendee) =>
        parseInt(attendee.user?.id) ===
        parseInt(localStorage.getItem("user_id"))
    );

    if (event.attendees?.length >= event.available_spots) {
      return <Text>{t("this-event-is-sold-out")}</Text>;
    } else if (isAttendee) {
      return (
        <Button
          size="sm"
          colorScheme="blue"
          ml="2"
          variant="outline"
          type="button"
          onClick={() =>
            leaveEvent(event.id).then(() => {
              fetchEvents();
            })
          }
        >
          {t("leave")}
        </Button>
      );
    } else {
      return (
        <Button
          size="sm"
          colorScheme="blue"
          variant="solid"
          ml="2"
          type="button"
          onClick={() =>
            joinEvent(event.id).then(() => {
              fetchEvents();
            })
          }
        >
          {t("join")}
        </Button>
      );
    }
  } else {
    return null;
  }
};
