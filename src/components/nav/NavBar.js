import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
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
      {localStorage.getItem("auth_token") !== null ? (
        <li className="nav-item">
          <button
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_type");
              localStorage.removeItem("user_id");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </>
      )}{" "}
    </ul>
  );
};
