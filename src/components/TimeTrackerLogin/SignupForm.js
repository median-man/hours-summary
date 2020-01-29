import React, { useState } from "react";
import PropTypes from "prop-types";
import * as timeTrackerApi from "../../utils/time-tracker-api";

const SubmitButton = ({ isPending, isLogginPending }) => {
  let text = "Submit";
  if (isLogginPending) {
    text = "Logging in...";
  } else if (isPending) {
    text = "Creating account...";
  }
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
  isPending: PropTypes.bool,
  isLogginPending: PropTypes.bool
};

const SignupForm = ({ onLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isLogginPending, setIsLoginPending] = useState(false);

  const signup = async () => {
    const response = await timeTrackerApi.signup({ email, password });
    if (response.statusText === "Forbidden") {
      throw new Error("An account with that email already exists.");
    }
  };

  const login = async () => {
    const response = await timeTrackerApi.login({ email, password });
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
      await signup();
      setIsLoginPending(true);
      await login();
      onLoginChange(true);
    } catch (error) {
      alert(error.message);
      setIsLoginPending(false);
      setIsPending(false);
    }
  };

  const handlePasswordConfirmChange = ({ target }) => {
    target.setCustomValidity(
      target.value !== password ? "Does not match password!" : ""
    );
    setPasswordConfirm(target.value);
  };

  return (
    <>
      <p className="lead">
        Please complete the form and click submit to create an account for the
        Time Tracker service.{" "}
        <span className="small text-secondary">(Required for Time Clock.)</span>
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
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              aria-describedby="passwordDescription"
              onChange={e => setPassword(e.target.value)}
              value={password}
              disabled={isPending}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter Password"
              required="required"
              aria-describedby="passwordDescription"
              onChange={handlePasswordConfirmChange}
              value={passwordConfirm}
              disabled={isPending}
            />
            <small id="passwordDescription" className="form-text text-muted">
              Your password must be at least 8 characters long, contain letters
              and numbers, and must not contain spaces, special characters, or
              emoji.
            </small>
          </div>
          <div className="form-group">
            <SubmitButton
              isPending={isPending}
              isLogginPending={isLogginPending}
            />
          </div>
        </div>
      </form>
    </>
  );
};

SignupForm.propTypes = {
  onLoginChange: PropTypes.func.isRequired
};

export default SignupForm;
