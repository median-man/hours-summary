import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const SheetListItem = ({ text, id }) => {
  return (
    <button className="list-group-item list-group-item-action h6" type="button">
      <img
        src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet"
        aria-hidden="true"
        className="mr-2"
      />
      {text}
      <a
        className="web-view-link pl-2"
        href={`https://docs.google.com/spreadsheets/d/${id}/edit?usp=drivesdk`}
        aria-label="Open sheet in new tab"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>
    </button>
  );
};

export default SheetListItem;
