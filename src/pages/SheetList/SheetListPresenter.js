import React from "react";
import SheetListItem from "./SheetListItem";

const SheetListPresenter = ({ sheets }) => {
  return (
    <div className="container mt-3">
      <div className="list-group list-group-flush">
        {sheets.map(sheet => (
          <SheetListItem key={sheet.id} {...sheet} />
        ))}
      </div>
    </div>
  );
};

export default SheetListPresenter;
