import React, { useState } from "react";
import { getHoursSheet, setHoursSheetId } from "../../utils/sheets-api";
import { useAuthContext } from "../../utils/auth";
import SheetList from "../SheetList";
import DashboardPresenter from "./DashboardPresenter";

const Container = ({ children }) => (
  <div className="container mt-3">{children}</div>
);

const Dashboard = () => {
  const [auth] = useAuthContext();
  const [hoursSheet, setHoursSheet] = useState(getHoursSheet());

  const handleSheetSelect = sheetId => {
    setHoursSheetId(sheetId);
    setHoursSheet(getHoursSheet());
  };

  if (!auth.isLoggedIn) {
    return <Container>Please log in.</Container>;
  }

  if (hoursSheet) {
    console.log(hoursSheet);
    return (
      <Container>
        <DashboardPresenter />
      </Container>
    );
  }

  return (
    <Container>
      <SheetList onSheetSelect={handleSheetSelect} />;
    </Container>
  );
};

export default Dashboard;
