import { Box, Center } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <>
      <Box position="relative">
        <Box
          height={{ base: "200px", md: "300px", lg: "400px" }}
          bg="gray.200"
          overflow="hidden"
        >
          <img
            src=""
            alt="Header Image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      </Box>
    </>
  );
};
