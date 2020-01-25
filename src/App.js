import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./utils/auth";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
