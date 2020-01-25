import React from "react";
import SheetListItem from "./SheetListItem";

const SheetListPresenter = ({ sheets, onSheetSelect }) => {
  return (
    <div className="list-group list-group-flush">
      {sheets.map(sheet => (
        <SheetListItem
          key={sheet.id}
          {...sheet}
          onClick={() => onSheetSelect(sheet.id)}
        />
      ))}
    </div>
  );
};

export default SheetListPresenter;
