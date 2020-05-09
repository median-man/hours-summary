import React from "react";
import { AngleIcon } from "../Icons";

const NavButton = (props) => (
  <span role="button" style={{ cursor: "pointer" }} {...props} />
);

export const NextWeekButton = ({ onClick }) => (
  <NavButton onClick={onClick}>
    <AngleIcon direction="right" />
  </NavButton>
);

export const PrevWeekButton = ({ onClick }) => (
  <NavButton onClick={onClick}>
    <AngleIcon direction="left" />
  </NavButton>
);
