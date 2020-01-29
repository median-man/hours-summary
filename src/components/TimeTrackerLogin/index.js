import React, { useState } from "react";
import PropTypes from 'prop-types';
import Container from "../Container";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const TimeTrackerLogin = ({onLoginChange}) => {
  const [isSignup, setIsSignup] = useState(true);

  const toggleLoginSignup = () => setIsSignup(!isSignup);

  return (
    <Container>
      <div style={{ maxWidth: "360px" }}>
        <h1 className="h2">Time Clock</h1>
        {isSignup ? <SignupForm onLoginChange={onLoginChange}/> : <LoginForm onLoginChange={onLoginChange} />}
        <div className="text-center">
          <button onClick={toggleLoginSignup} className="btn btn-link">
            {isSignup ? "Already signed up? Go to login." : "Create account"}
          </button>
        </div>
      </div>
    </Container>
  );
};

TimeTrackerLogin.propTypes = {
  onLoginChange: PropTypes.func.isRequired
}

export default TimeTrackerLogin;
