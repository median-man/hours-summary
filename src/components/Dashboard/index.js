import React, { useState, useEffect } from "react";
import { getHoursSheet, setHoursSheetId } from "../../utils/sheets-api";
import { useAuthContext } from "../../utils/auth";
import SheetList from "../SheetList";

const Dashboard = () => {
  const [auth] = useAuthContext();
  const [hoursSheet, setHoursSheet] = useState(getHoursSheet());

  const handleSheetSelect = sheetId => {
    setHoursSheetId(sheetId)
    setHoursSheet(getHoursSheet())
  }

  if (!auth.isLoggedIn) {
    return <div>Please log in.</div>;
  }
  if (hoursSheet) {
    return <div>Dashboard</div>;
  }
  return <SheetList onSheetSelect={handleSheetSelect} />;
};

export default Dashboard;
