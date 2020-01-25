import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./utils/auth";
import * as gapi from "./utils/google-api";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

function App() {
  const [isGapiClientLoaded, setIsGapiClientLoaded] = useState(false);
  useEffect(() => {
    gapi
      .loadClientWithAuth()
      .then(() => setIsGapiClientLoaded(true))
      .catch(error => {
        console.log(error);
        setIsGapiClientLoaded(false);
      });
  }, []);

  if (isGapiClientLoaded) {
    return (
      <AuthProvider>
        <Navbar />
        <Dashboard />
      </AuthProvider>
    );
  }
  return <Spinner />;
}

export default App;
