import React from "react";
import { getHoursSheet } from "../../utils/sheets-api";
import { useAuthContext } from "../../utils/auth";
import SheetList from "../SheetList";

const Dashboard = () => {
  const [auth] = useAuthContext();
  if (!auth.isLoggedIn) {
    return <div>Please log in.</div>;
  }
  const hoursSheet = getHoursSheet()
  if (hoursSheet) {
      return <div>Dashboard</div>;
  }
  return <SheetList />
};

export default Dashboard;
