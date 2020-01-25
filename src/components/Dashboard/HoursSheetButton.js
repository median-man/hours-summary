import React from "react";
import { ExternalLinkIcon } from "../Icons";

const HoursSheetButton = ({ sheetId }) => (
  <a
    href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=drivesdk`}
    id="external-link-hours-sheet"
    className="btn btn-secondary"
    target="_blank"
    rel="noopener noreferrer"
  >
    View Hours Sheet <ExternalLinkIcon />
  </a>
);

export default HoursSheetButton;
