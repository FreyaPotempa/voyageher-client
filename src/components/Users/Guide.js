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
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { StarIcon } from "../../images/StarIcon";
import { useTranslation } from "react-i18next";
import { useUser } from "../../useUser";

export const Guide = ({ guide_id, isOpen, onClose, getGuideRating }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [guide, setGuide] = useState({});
  const { userType } = useUser();
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
              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={
                        i < Math.floor(guide.average_rating)
                          ? "#096e86"
                          : "#E0E0E0"
                      }
                    />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {guide.ratings?.length} {t("reviews-0")}
                </Box>
              </Box>

              <Box p="6">
                <ModalHeader>{guide.full_name}</ModalHeader>
                <Divider />
                <Text m="2">{guide.location?.city}</Text>
                <Text m="2">
                  {t("about")}: {guide.bio}
                </Text>
                <Text m="2">{t("reviews")}: </Text>
                {guide.ratings?.map((rating) => (
                  <Text key={rating.id} m="4">
                    "{rating.review}"
                  </Text>
                ))}
              </Box>
              {userType === "traveler" ? (
                <Box borderWidth="1px" borderRadius="lg" m="2" p="2">
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
                      sendRating(ratingState, guide_id).then(() => fetchGuide())
                    }
                  >
                    {t("save-rating")}
                  </Button>{" "}
                </Box>
              ) : (
                ""
              )}
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
