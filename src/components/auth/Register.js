import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../managers/AuthManager";
import { getLocations } from "../managers/LocationManager";

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
  const navigate = useNavigate();

  const getAllLocations = () => {
    getLocations().then((data) => {
      setLocations(data);
    });
  };

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

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputUsername">Username</label>
          <input
            ref={username}
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="bio"> Story </label>
          <textarea
            ref={bio}
            name="bio"
            className="form-control"
            placeholder="Tell us about your travels..."
          />
        </fieldset>
        <input
          type="checkbox"
          checked={is_guide}
          onChange={handleCheckboxChange}
        />
        I'm a Tour Guide
        {is_guide ? (
          <fieldset>
            <label htmlFor="location">Location </label>
            <select name="location_id" onChange={handleSelectChange}>
              <option value="0">Select Your Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}
                </option>
              ))}
            </select>
          </fieldset>
        ) : (
          ""
        )}
        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-1 btn-sep icon-send" type="submit">
            Register
          </button>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  );
};
