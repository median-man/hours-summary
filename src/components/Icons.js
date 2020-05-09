import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

export const ExternalLinkIcon = (props) => (
  <FontAwesomeIcon {...props} icon={faExternalLinkAlt} />
);

export const AngleIcon = ({ direction, props }) => (
  <FontAwesomeIcon
    {...props}
    icon={direction === "right" ? faAngleRight : faAngleLeft}
  />
);
