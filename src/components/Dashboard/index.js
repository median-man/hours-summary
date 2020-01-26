import React, { useState, useEffect } from "react";
import { getHoursSheet, setHoursSheetId } from "../../utils/sheets-api";
import { useAuthContext } from "../../utils/auth";
import SheetList from "../SheetList";
import DashboardPresenter from "./DashboardPresenter";
import Spinner from "../Spinner";
import Container from "../Container";

const Dashboard = ({ hours }) => {
  const [auth] = useAuthContext();
  const [hoursSheet, setHoursSheet] = useState(getHoursSheet());
  const [isHoursLoaded, setIsHoursLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (hoursSheet) {
        await hours.load();
      }
      setIsHoursLoaded(hours.isLoaded());
    })();
  }, [hoursSheet, hours]);

  const handleSheetSelect = sheetId => {
    setHoursSheetId(sheetId);
    setHoursSheet(getHoursSheet());
  };

  if (!auth.isLoggedIn) {
    return <Container>Please log in.</Container>;
  }

  if (isHoursLoaded) {
    return (
      <Container>
        <DashboardPresenter sheetId={hoursSheet.id} {...hours.totals()} />
      </Container>
    );
  }

  if (hoursSheet) {
    return <Spinner />;
  }

  return (
    <Container>
      <SheetList onSheetSelect={handleSheetSelect} />
    </Container>
  );
};

export default Dashboard;
