import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { joinEvent, leaveEvent } from "../managers/EventManager";

export const JoinLeaveButton = ({ event, fetchEvents }) => {
  if (localStorage.getItem("user_type") === "traveler") {
    const isAttendee = event.attendees.find(
      (attendee) =>
        parseInt(attendee.user?.id) ===
        parseInt(localStorage.getItem("user_id"))
    );

    if (event.attendees.length >= event.available_spots) {
      return <Text>This event is Sold Out</Text>;
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
          Leave
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
          Join
        </Button>
      );
    }
  } else {
    return null;
  }
};
