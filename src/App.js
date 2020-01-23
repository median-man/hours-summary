import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
  <Router>
    <Navbar />
    <Route exact path="/">
      App
    </Route>
  </Router>
  );
}

export default App;
