import { Button, ButtonGroup, Text, useDisclosure } from "@chakra-ui/react";
import { joinEvent, leaveEvent } from "../managers/EventManager";
import { useTranslation } from "react-i18next";
import { useUser } from "../../useUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../auth/Login";
import { LoginModal } from "../auth/LoginModal";

export const JoinLeaveButton = ({ event, fetchEvents }) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { userType, userId, isLoggedIn } = useUser();
  if (userType === "traveler" || !isLoggedIn) {
    const isAttendee = event.attendees?.find(
      (attendee) => parseInt(attendee.user?.id) === parseInt(userId)
    );

    const handleJoinClick = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

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
        <>
          <Button
            size="sm"
            colorScheme="blue"
            variant="solid"
            ml="2"
            type="button"
            onClick={() => {
              if (!isLoggedIn) {
                handleJoinClick();
              } else {
                joinEvent(event.id).then(() => {
                  fetchEvents();
                });
              }
            }}
          >
            {t("join")}
          </Button>
          <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </>
      );
    }
  } else {
    return null;
  }
};
