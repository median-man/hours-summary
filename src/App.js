import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SheetList from "./pages/SheetList";

function App() {
  return (
  <Router>
    <Navbar />
    <Route exact path="/">
      <SheetList />
    </Route>
  </Router>
  );
}

export default App;
