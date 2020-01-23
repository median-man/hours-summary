import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
  <Router>
    <Route exact path="/">
      App
    </Route>
  </Router>
  );
}

export default App;
