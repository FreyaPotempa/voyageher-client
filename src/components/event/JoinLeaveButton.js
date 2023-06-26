import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { joinEvent, leaveEvent } from "../managers/EventManager";
import { useTranslation } from "react-i18next";
import { useUser } from "../../useUser";
import { useNavigate } from "react-router-dom";

export const JoinLeaveButton = ({ event, fetchEvents }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { userType, userId, isLoggedIn } = useUser();
  if (userType === "traveler" || isLoggedIn === false) {
    const isAttendee = event.attendees?.find(
      (attendee) => parseInt(attendee.user?.id) === parseInt(userId)
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
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
            } else {
              joinEvent(event.id).then(() => {
                fetchEvents();
              });
            }
          }}
        >
          {t("join")}
        </Button>
      );
    }
  } else {
    return null;
  }
};
