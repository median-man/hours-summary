import React from "react";
import SheetListItem from "./SheetListItem";

const SheetListPresenter = ({ sheets, onSheetSelect }) => {
  return (
    <div className="container mt-3">
      <div className="list-group list-group-flush">
        {sheets.map(sheet => (
          <SheetListItem key={sheet.id} {...sheet} onClick={() => onSheetSelect(sheet.id)} />
        ))}
      </div>
    </div>
  );
};

export default SheetListPresenter;
