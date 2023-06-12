import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuideById, sendRating } from "../managers/UserManager";

export const Guide = () => {
  const { guide_id } = useParams();
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
    <>
      <h1>{guide.full_name}</h1>
      <div>About: {guide.bio}</div>
      <div>Located in: {guide.location?.city}</div>
      <div>Average Rating: {guide.average_rating} </div>
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
    </>
  );
};
