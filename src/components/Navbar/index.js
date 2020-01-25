import React from "react";
import GoogleAuth from "../GoogleAuth";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="./index.html">
        My Hours Summary
      </a>{" "}
      <GoogleAuth />
    </nav>
  );
};

export default Navbar;
