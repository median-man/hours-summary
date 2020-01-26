import React from "react";

const ButtonSpinner = () => (
  <span
    className="spinner-border spinner-border-sm ml-1"
    role="status"
    aria-hidden="true"
  />
);

const Button = ({ isPending, children, ...btnProps }) => (
  <button
    type="button"
    className="btn btn-outline-dark btn-block"
    {...btnProps}
  >
    {isPending ? <ButtonSpinner /> : children}
  </button>
);

export default Button;
