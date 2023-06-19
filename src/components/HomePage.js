import { Box, CardHeader, Center, Heading } from "@chakra-ui/react";
import { EventList } from "./event/EventList";
import { useEffect, useState } from "react";
import "animate.css";

export const HomePage = () => {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [showStaticImage, setShowStaticImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStaticImage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGifLoaded = () => {
    setGifLoaded(true);
  };
  return (
    <>
      <Box position="relative">
        <Box
          height={{ base: "200px", md: "300px", lg: "400px" }}
          bg="gray.200"
          overflow="hidden"
        >
          <img
            src="https://res.cloudinary.com/dndff6clf/image/upload/v1686776588/HeaderTextAnimated_v0h4yd.gif"
            alt="Header Image"
            width="100%"
            height="100%"
            onLoad={handleGifLoaded}
            style={{
              display: gifLoaded && !showStaticImage ? "block" : "none",
            }}
          />
          {showStaticImage && (
            <img
              src="https://res.cloudinary.com/dndff6clf/image/upload/v1686777503/HeaderTextAnimated_sbpohj.png"
              alt="static image"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            />
          )}
        </Box>
      </Box>
      <Heading
        size="lg"
        as="h2"
        className="animate__animated animate__fadeInDown animate__delay-1s"
      >
        Find Your Next
      </Heading>
      <Heading
        as="h1"
        size="4xl"
        className="animate__animated animate__fadeInLeft animate__delay-1s animate__slow"
      >
        Adventure
      </Heading>

      <EventList />
    </>
  );
};

//TODO: Look into doing this differently bc there's a weird jump that happens when it loads the static image
