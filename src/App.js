import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./utils/auth";
import * as gapi from "./utils/google-api";
import * as sheetsApi from "./utils/sheets-api";
import { Hours } from "./utils/hours";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

function App() {
  const [isGapiClientLoaded, setIsGapiClientLoaded] = useState(false);
  const [gapiError, setGapiError] = useState(null);
  useEffect(() => {
    gapi
      .loadClientWithAuth()
      .then(() => setIsGapiClientLoaded(true))
      .catch(error => {
        setIsGapiClientLoaded(false);
        setGapiError(error)
      });
  }, []);

  if (isGapiClientLoaded) {
    return (
      <AuthProvider>
        <Navbar />
        <Dashboard hours={new Hours({ sheetsApi })} />
      </AuthProvider>
    );
  }

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
  return <Spinner />;
}

export default App;
