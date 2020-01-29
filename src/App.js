import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./utils/auth";
import * as gapi from "./utils/google-api";
import * as sheetsApi from "./utils/sheets-api";
import * as timeTrackerApi from "./utils/time-tracker-api";
import { Hours } from "./utils/hours";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import TimeClock from "./components/TimeClock";
import TimeTrackerLogin from "./components/TimeTrackerLogin";

function App() {
  const [isGapiClientLoaded, setIsGapiClientLoaded] = useState(false);
  const [gapiError, setGapiError] = useState(null);
  const [isLoggedInWithTimeTrackerApi, setIsLoggedInWithTimeTrackerApi] = useState(timeTrackerApi.isLoggedIn());

  useEffect(() => {
    gapi
      .loadClientWithAuth()
      .then(() => setIsGapiClientLoaded(true))
      .catch(error => {
        setIsGapiClientLoaded(false);
        setGapiError(error);
      });
  }, []);

  if (gapiError) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-danger">
          <h1 className="display-3">Uh, oh!</h1>
          <p>
            An unexpected error occurred while connecting with Google. Please
            try again later.
          </p>
        </div>
      </div>
    );
  }
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar isGapiClientLoaded={isGapiClientLoaded} />
        <Switch>
          <Route path="/time-tracker-login">
            {isLoggedInWithTimeTrackerApi ? <Redirect to="/time-clock" /> : <TimeTrackerLogin onLoginChange={setIsLoggedInWithTimeTrackerApi} />}
          </Route>
          <Route path="/time-clock">
            {isLoggedInWithTimeTrackerApi ? <TimeClock /> : <Redirect to="/time-tracker-login" />}
          </Route>
          <Route path="/">
            {isGapiClientLoaded ? (
              <Dashboard hours={new Hours({ sheetsApi })} />
            ) : (
              <Spinner />
            )}
          </Route>
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
