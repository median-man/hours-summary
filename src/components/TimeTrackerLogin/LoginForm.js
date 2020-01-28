import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    try {
      // TODO: send request to time tracker api
      setTimeout(() => {
        onLoginChange(true);
      }, 600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="lead">
        Please login to the time tracker service to enable the time clock.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required="required"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
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
