import {
  Button,
  Flex,
  HStack,
  Link,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { LogoSVG } from "../../images/VoyageHerLogo";
import { LogoSVGDarkMode } from "../../images/LogoDarkMode";

export const NavBar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#096E86", "#7FFFFF");

  const LogoutColorMode = () => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
  };

  return (
    <Flex
      w="100%"
      px="6"
      py="2"
      mb="0.5"
      align="center"
      justify="space-between"
    >
      <HStack>
        <Link as={ReactLink} to="/">
          {colorMode === "light" ? <LogoSVG /> : <LogoSVGDarkMode />}
        </Link>
      </HStack>
      <HStack>
        {localStorage.getItem("user_type") === "guide" ? (
          <Link color="#0099D6" as={ReactLink} to="/eventForm">
            Create Event
          </Link>
        ) : (
          ""
        )}
        <Link
          color="#0099D6"
          as={ReactLink}
          to="/myevents"
          className="navbar__item"
        >
          My Events
        </Link>
        <Link
          color="#0099D6"
          as={ReactLink}
          to="/dashboard"
          className="navbar__item"
        >
          Profile
        </Link>
      </HStack>
      <HStack>
        <Button onClick={toggleColorMode} colorScheme="cyan" size="sm">
          {colorMode === "light" ? (
            <Tooltip label="Dark Mode">
              <svg
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </Tooltip>
          ) : (
            <Tooltip label="Light Mode">
              <svg
                height={25}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </Tooltip>
          )}
        </Button>
        {localStorage.getItem("auth_token") !== null ? (
          <Button
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_type");
              localStorage.removeItem("user_id");
              LogoutColorMode();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}{" "}
      </HStack>
    </Flex>
  );
};
