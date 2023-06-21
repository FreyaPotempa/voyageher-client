import {
  Box,
  CardHeader,
  Center,
  Flex,
  Heading,
  LightMode,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { EventList } from "./event/EventList";
import { useEffect, useState } from "react";
import "animate.css";
import "@fontsource/lobster"; // Import Lobster font
import "@fontsource/open-sans"; // Import Open Sans font
import "@fontsource-variable/lora";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box position="relative">
        <Box
          height={{ base: "200px", md: "300px", lg: "400px" }}
          bg="gray.200"
          overflow="hidden"
        >
          <img
            src="https://res.cloudinary.com/dndff6clf/image/upload/v1686684545/priscilla-du-preez-nF8xhLMmg0c-unsplash_ynmo0m.jpg"
            alt="header image"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        position="absolute"
        top="200px"
        left="15px"
        transform="translate(-25%, -25%)"
        textAlign="center"
        width="100%"
      >
        <Heading
          size="xl"
          as="h1"
          className="animate__animated animate__fadeInDown animate__delay-0.5s"
          fontFamily="Lora Variable"
          color="gray.800"
        >
          {t("find_your_next")}
        </Heading>
        <Heading
          mt="2"
          as="h1"
          size="4xl"
          className="animate__animated animate__fadeInLeft animate__delay-0.8s animate__slow"
          fontFamily="Lobster"
          color="#096e86"
        >
          {t("adventure")}
        </Heading>
      </Box>

      <EventList />
    </>
  );
};
