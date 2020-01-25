import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SheetList from "./pages/SheetList";
import { AuthProvider } from "./utils/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route exact path="/">
          <SheetList />
        </Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
