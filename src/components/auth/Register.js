import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../managers/AuthManager";
import { getLocations } from "../managers/LocationManager";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const [location_id, setLocationId] = useState(null);
  const [is_guide, setIsGuide] = useState(false);
  const [locations, setLocations] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getAllLocations = () => {
    getLocations().then((data) => {
      setLocations(data);
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    getAllLocations();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        password: password.current.value,
        is_guide: is_guide,
        location_id: location_id,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res && "user_type" in res && "user_id" in res) {
          localStorage.setItem("auth_token", res.token);
          localStorage.setItem("user_type", res.user_type);
          localStorage.setItem("user_id", res.user_id);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  const handleCheckboxChange = () => {
    setIsGuide(!is_guide);
  };

  const handleSelectChange = (e) => {
    setLocationId(e.target.value);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.600"}
      >
        <Box p="18">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h4" size="md">
              Register for VoyageHer
            </Heading>
            <form className="form--login" onSubmit={handleRegister}>
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
                      ref={firstName}
                      type="text"
                      id="first_name"
                      name="firstName"
                      className="form-control"
                      placeholder="First name"
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
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                    <Input
                      ref={lastName}
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last name"
                      required
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
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      }
                    />
                    <Input
                      ref={username}
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      required
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
                      ref={password}
                      type={showPassword ? "text" : "password"}
                      name="password"
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
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={verifyPassword}
                      type={showPassword ? "text" : "password"}
                      name="verifyPassword"
                      className="form-control"
                      placeholder="verify Password"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <Input
                    ref={bio}
                    type="text"
                    name="bio"
                    className="form-control"
                    placeholder="What's your story?"
                  />
                </FormControl>
                <Checkbox
                  type="checkbox"
                  checked={is_guide}
                  onChange={handleCheckboxChange}
                >
                  I'm a Tour Guide
                </Checkbox>
                {is_guide ? (
                  <FormControl>
                    <Select name="location_id" onChange={handleSelectChange}>
                      <option value="0">Select Your Location</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.city}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  ""
                )}
                <Button
                  className="btn btn-1 btn-sep icon-send"
                  type="submit"
                  p="2"
                  m="2"
                  variant="solid"
                  borderRadius={0}
                  colorScheme="cyan"
                >
                  {" "}
                  Register{" "}
                </Button>
              </Stack>
            </form>
          </Stack>
          <Center>
            Already registered? <Link to="/login">Login</Link>
          </Center>
        </Box>
      </Flex>
    </main>
  );
};
