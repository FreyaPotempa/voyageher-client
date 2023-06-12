import { Button, Flex, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Flex w="100%" px="6" py="2" mb="6" align="center" justify="space-between">
      <HStack>
        <Link to="/">Home</Link>
      </HStack>
      <HStack>
        {localStorage.getItem("user_type") === "guide" ? (
          <Link to="/eventForm">Create Event</Link>
        ) : (
          ""
        )}
        <Link to="/myevents" className="navbar__item">
          My Events
        </Link>
        <Link to="/dashboard" className="navbar__item">
          Profile
        </Link>
      </HStack>
      <HStack>
        {localStorage.getItem("auth_token") !== null ? (
          <Button
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_type");
              localStorage.removeItem("user_id");
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
