import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuideById, sendRating } from "../managers/UserManager";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { StarIcon } from "../../images/StarIcon";
import { useTranslation } from "react-i18next";

export const Guide = ({ guide_id, isOpen, onClose, getGuideRating }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  useEffect(() => {
    getGuideRating(guide.average_rating, guide.ratings?.length);
  }, [guide]);

  const handleGuideRating = (e) => {
    const { name, value } = e.target;
    setRatingState((ratingState) => ({ ...ratingState, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box>
              <Avatar
                mt="2"
                ml="4"
                size="xl"
                name={guide.full_name}
                src={guide.img}
              />
              <ModalHeader>{guide.full_name}</ModalHeader>
              <Divider />
              <div>{guide.location?.city}</div>
              <div>
                {t("about")}: {guide.bio}
              </div>
            </Box>
            <Center m="4" height="250px">
              <Divider orientation="vertical" />
            </Center>
            <Box mt="20">
              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={
                        i < Math.floor(guide.average_rating)
                          ? "0099d6"
                          : "#E0E0E0"
                      }
                    />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {guide.ratings?.length} {t("reviews-0")}
                </Box>
              </Box>
              <Box>
                {t("reviews")}:{" "}
                {guide.ratings?.map((rating) => `"${rating.review}"`)}
              </Box>
              <Box borderWidth="1px" borderRadius="lg" m="2" p="2">
                {localStorage.getItem("user_type") === "traveler" ? (
                  <>
                    <Heading size="md">{t("rate-this-guide")}</Heading>
                    <Select name="score" onChange={handleGuideRating}>
                      <option value="0">{t("select-a-rating")}</option>
                      <option value="1">{t("awful")}</option>
                      <option value="2">{t("poor")}</option>
                      <option value="3">{t("okay")}</option>
                      <option value="4">{t("good")}</option>
                      <option value="5">{t("great")}</option>
                    </Select>
                    <div>
                      <label htmlFor="review">{t("leave-a-review")}:</label>
                      <Input
                        type="text"
                        name="review"
                        value={ratingState.review}
                        onChange={handleGuideRating}
                      />
                    </div>
                    <Button
                      size="sm"
                      colorScheme="cyan"
                      variant="outline"
                      type="button"
                      onClick={(e) =>
                        sendRating(ratingState, guide_id).then(() =>
                          fetchGuide()
                        )
                      }
                    >
                      {t("save-rating")}
                    </Button>{" "}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
