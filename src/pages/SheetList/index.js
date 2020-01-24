import React from "react";
import SheetListPresenter from "./SheetListPresenter";

const SheetList = () => {
  const googleSheets = [
    {
      text: "Sheet 1",
      id: "sheet-1"
    },
    {
      text: "Sheet 2",
      id: "sheet-2"
    },
    {
      text: "Sheet 3",
      id: "sheet-3"
    }
  ];
  return <SheetListPresenter sheets={googleSheets} />;
};

export default SheetList;
