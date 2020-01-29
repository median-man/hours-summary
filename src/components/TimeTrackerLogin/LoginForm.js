import React, { useState } from "react";
import PropTypes from "prop-types";
import * as timeTrackerApi from "../../utils/time-tracker-api";

const SubmitButton = ({ isPending }) => {
  const text = isPending ? "Logging in..." : "Login";

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isPending}
    >
      {isPending && (
        <span
          className="spinner-border spinner-border-sm mr-2"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  isPending: PropTypes.bool
};

const LoginForm = ({ onLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const login = async () => {
    const response = await timeTrackerApi.login({ email, password });
    if (response.statusText === "Bad Request") {
      throw new Error("Invalid username or password.")
    }
    if (response.statusText !== "OK") {
      throw new Error("The service is unavailable. Please try again later.")
    }
    const body = await response.json();
    timeTrackerApi.token.set(body.token);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (isPending) {
      // prevent multiple requests
      return;
    }
    setIsPending(true);
    try {
      await login();
      onLoginChange(true);
    } catch (error) {
      alert(error.message);
      setIsPending(false);
    }
  };

  return (
    <>
      <p className="lead">
        Please login to the time tracker service to enable the Time Clock.{" "}
      </p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required="required"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
              minLength="8"
              onChange={e => setPassword(e.target.value)}
              value={password}
              disabled={isPending}
            />
          </div>
          <div className="form-group">
            <SubmitButton isPending={isPending} />
          </div>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  onLoginChange: PropTypes.func.isRequired
};

export default LoginForm;
