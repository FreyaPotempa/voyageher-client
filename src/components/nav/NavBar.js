import {
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Link,
  Select,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { LogoSVG } from "../../images/VoyageHerLogo";
import { LogoSVGDarkMode } from "../../images/LogoDarkMode";
import { useTranslation, Trans } from "react-i18next";

const lngs = {
  en: { nativeName: "🇬🇧" },
  es: { nativeName: "🇪🇸" },
  de: { nativeName: "🇩🇪" },
  lol: { nativeName: "😺" },
};

export const NavBar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#096E86", "#7FFFFF");
  const { t, i18n } = useTranslation();

  const LogoutColorMode = () => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
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
          <>
            <Link color="#0099D6" as={ReactLink} to="/eventForm">
              {t("create_event")}
            </Link>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
          </>
        ) : (
          ""
        )}
        <Link
          color="#0099D6"
          as={ReactLink}
          to="/myevents"
          className="navbar__item"
        >
          {t("my_events")}
        </Link>
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
        <Link
          color="#0099D6"
          as={ReactLink}
          to="/dashboard"
          className="navbar__item"
        >
          {t("profile")}
        </Link>
      </HStack>
      <HStack>
        <Select variant="unstyled" width="50px" onChange={handleLanguageChange}>
          {Object.keys(lngs).map((lng) => (
            <option value={lng} key={lng}>
              {lngs[lng].nativeName}
            </option>
          ))}
        </Select>
        <Button onClick={toggleColorMode} colorScheme="cyan" size="xs">
          {colorMode === "light" ? (
            <Tooltip label="Dark Mode">
              <svg
                height={15}
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
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </Tooltip>
          )}
        </Button>
        {localStorage.getItem("auth_token") !== null ? (
          <Button
            size="xs"
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_type");
              localStorage.removeItem("user_id");
              LogoutColorMode();
              navigate("/login");
            }}
          >
            {t("logout")}
          </Button>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              {t("login")}
            </Link>
            <Link className="nav-link" to="/register">
              {t("register")}
            </Link>
          </>
        )}{" "}
      </HStack>
    </Flex>
  );
};
