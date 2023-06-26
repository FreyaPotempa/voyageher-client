import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../managers/UserManager";
import {
  Avatar,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Heading,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { UploadWidget } from "../../UploadWidget";
import { useUser } from "../../useUser";

export const Profile = () => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { userType } = useUser();
  const toast = useToast();
  const [user, setUser] = useState({
    traveler: {
      bio: "",
    },
    guide: {
      bio: "",
    },
  });

  const fetchUser = () => {
    getCurrentUser().then((data) => setUser(data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateImageUrl = (url) => {
    if (userType === "traveler") {
      setUser((user) => ({
        ...user,
        traveler: { ...user.traveler, img: url },
      }));
    } else {
      setUser((user) => ({ ...user, guide: { ...user.guide, img: url } }));
    }
  };

  const changeBio = (e) => {
    const bio = e.target.value;
    if (userType === "traveler") {
      setUser((user) => ({
        ...user,
        traveler: { ...user.traveler, bio: bio },
      }));
    } else {
      setUser((user) => ({ ...user, guide: { ...user.guide, bio: bio } }));
    }
  };

  return (
    <Container
      borderWidth="1px"
      maxWidth="550px"
      bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
      p="6"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Avatar
        size="2xl"
        name={user.first_name}
        src={
          user.user_type === "traveler" ? user.traveler?.img : user.guide?.img
        }
      />
      <UploadWidget updateImageUrl={updateImageUrl} />
      <Heading fontFamily="Lora">
        {user.first_name} {user.last_name}
      </Heading>
      <Editable
        value={userType === "traveler" ? user.traveler?.bio : user.guide?.bio}
      >
        <EditablePreview />
        <EditableTextarea onChange={changeBio} />
      </Editable>
      <Button
        type="button"
        colorScheme="cyan"
        onClick={(e) =>
          updateUser(user)
            .then(() => fetchUser())
            .then(() =>
              toast({
                title: "Profile Updated!",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            )
        }
      >
        {t("save-changes")}
      </Button>
    </Container>
  );
};
