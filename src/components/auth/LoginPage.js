import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Login } from "./Login";

export const LoginPage = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={colorMode === "light" ? "gray.200" : "gray.600"}
    >
      <Box p="18">
        <Login />;
      </Box>
    </Flex>
  );
};
