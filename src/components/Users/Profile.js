import { useEffect, useState } from "react";
import { getCurrentUser } from "../managers/UserManager";
import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});

  const fetchUser = () => {
    getCurrentUser().then((data) => setUser(data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);

  return (
    <Container>
      <Heading fontFamily="Lora">
        {user.first_name} {user.last_name}
      </Heading>
      <Text>
        {user.user_type === "traveler"
          ? `${user.traveler?.bio}`
          : `${user.guide?.bio}`}
      </Text>
      <Button>{t("edit")}</Button>
    </Container>
  );
};
