import React, { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log({ email, password, passwordConfirm });
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
            />
            <small id="passwordDescription" className="form-text text-muted">
              Your password must be at least 8 characters long, contain letters
              and numbers, and must not contain spaces, special characters, or
              emoji.
            </small>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
