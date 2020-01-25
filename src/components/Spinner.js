import React from "react";

const Spinner = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div
        style={{ width: "5rem", height: "5rem" }}
        className="spinner-border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
