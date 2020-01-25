import React, { useState, useEffect } from "react";
import SheetListPresenter from "./SheetListPresenter";
import { fetchAllSheets } from "../../utils/sheets-api";

const SheetList = ({ onSheetSelect }) => {
  const [googleSheets, setGoogleSheets] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchAllSheets();
      setGoogleSheets(result);
    })();
  }, []);
  return (
    <SheetListPresenter onSheetSelect={onSheetSelect} sheets={googleSheets} />
  );
};

export default SheetList;
