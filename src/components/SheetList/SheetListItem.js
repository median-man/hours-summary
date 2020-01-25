import React from "react";
import { ExternalLinkIcon } from "../Icons";

const SheetListItem = ({ name, id, onClick }) => {
  return (
    <button
      className="list-group-item list-group-item-action h6"
      type="button"
      onClick={onClick}
    >
      <img
        src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet"
        aria-hidden="true"
        className="mr-2"
        alt=""
      />
      {name}
      <a
        className="web-view-link pl-2"
        href={`https://docs.google.com/spreadsheets/d/${id}/edit?usp=drivesdk`}
        aria-label="Open sheet in new tab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLinkIcon />
      </a>
    </button>
  );
};

export default SheetListItem;
