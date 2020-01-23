import React from "react";
import GoogleAuth from "../GoogleAuth";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="./index.html">
        My Hours Summary
      </a>{" "}
      {/* <button
        id="button-login"
        className="btn btn-outline-primary ml-auto my-2 my-sm-0"
      >
        Sign In with Google
      </button> */}
      <GoogleAuth />
    </nav>
  );
};

export default Navbar;
