import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../managers/AuthManager";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode } = useColorMode();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    loginUser(user).then((res) => {
      if (
        "valid" in res &&
        res.valid &&
        "token" in res &&
        "user_type" in res &&
        "user_id" in res
      ) {
        localStorage.setItem("auth_token", res.token);
        localStorage.setItem("user_type", res.user_type);
        localStorage.setItem("user_id", res.user_id);
        navigate("/");
      } else {
        invalidDialog.current.showModal();
      }
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.600"}
        justifyContent="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h4" size="md">
            Please Sign In
          </Heading>
          <Box minW={{ base: "90%", md: "468px " }}>
            <form className="form--login" onSubmit={handleLogin}>
              <Stack
                width="350"
                spacing={4}
                p="1rem"
                backgroundColor={
                  colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.800"
                }
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.400"
                      children={
                        <svg
                          height="20"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                    <Input
                      type="username"
                      name="username"
                      ref={username}
                      type="username"
                      id="username"
                      className="form-control"
                      placeholder="Username address"
                      required
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.400"
                      children={
                        <svg
                          height="20"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      ref={password}
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  p="2"
                  m="2"
                  type="submit"
                  variant="solid"
                  borderRadius={0}
                  colorScheme="cyan"
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Center>
          <section className="link--register">
            <Link to="/register">Not a member yet?</Link>
          </section>
        </Center>
      </Flex>
    </>
  );
};
