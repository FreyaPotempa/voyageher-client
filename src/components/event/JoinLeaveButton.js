import { joinEvent, leaveEvent } from "../managers/EventManager";

export const JoinLeaveButton = ({ event, fetchEvents }) => {
  if (localStorage.getItem("user_type") === "traveler") {
    const isAttendee = event.attendees.find(
      (attendee) =>
        parseInt(attendee.user?.id) ===
        parseInt(localStorage.getItem("user_id"))
    );

    if (isAttendee) {
      return (
        <button
          type="button"
          onClick={() =>
            leaveEvent(event.id).then(() => {
              fetchEvents();
            })
          }
        >
          Leave
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={() =>
            joinEvent(event.id).then(() => {
              fetchEvents();
            })
          }
        >
          Join
        </button>
      );
    }
  } else {
    return null;
  }
};
