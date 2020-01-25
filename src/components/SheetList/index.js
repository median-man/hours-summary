import React, { useState, useEffect } from "react";
import SheetListPresenter from "./SheetListPresenter";
import { fetchAllSheets } from "../../utils/sheets-api";

const SheetList = () => {
  const [googleSheets, setGoogleSheets] = useState([
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
  ]);
  useEffect(() => {
    (async () => {
      const result = await fetchAllSheets();
      console.log(result);
    })();
  }, []);
  return <SheetListPresenter sheets={googleSheets} />;
};

export default SheetList;
