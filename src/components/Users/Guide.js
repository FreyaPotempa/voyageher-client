import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuideById, sendRating } from "../managers/UserManager";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const Guide = ({ guide_id, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [guide, setGuide] = useState({});
  const [ratingState, setRatingState] = useState({
    score: 0,
    review: "",
  });

  const fetchGuide = () => {
    getGuideById(guide_id).then((guideObj) => setGuide(guideObj));
  };

  useEffect(() => {
    fetchGuide();
  }, []);

  const handleGuideRating = (e) => {
    const { name, value } = e.target;
    setRatingState((ratingState) => ({ ...ratingState, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{guide.full_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>About: {guide.bio}</div>
          <div>Located in: {guide.location?.city}</div>
          <div>
            Average Rating:{" "}
            {guide.average_rating === null
              ? "No Reviews yet"
              : guide.average_rating?.toFixed(1)}{" "}
          </div>
          <div>Reviews:</div>
          {localStorage.getItem("user_type") === "traveler" ? (
            <>
              <select name="score" onChange={handleGuideRating}>
                Rate this Guide:
                <option value="0">select a rating</option>
                <option value="1">Awful</option>
                <option value="2">Poor</option>
                <option value="3">Okay</option>
                <option value="4">Good</option>
                <option value="5">Great</option>
              </select>
              <div>
                <label htmlFor="review">Leave a Review:</label>
                <input
                  type="text"
                  name="review"
                  value={ratingState.review}
                  onChange={handleGuideRating}
                />
              </div>
              <button
                type="button"
                onClick={(e) =>
                  sendRating(ratingState, guide_id).then(() => fetchGuide())
                }
              >
                Save Rating
              </button>{" "}
            </>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
