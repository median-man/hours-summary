import React, { useState, useEffect } from "react";
import { getHoursSheet, setHoursSheetId } from "../../utils/sheets-api";
import { useAuthContext } from "../../utils/auth";
import SheetList from "../SheetList";
import DashboardPresenter from "./DashboardPresenter";
import Spinner from "../Spinner";
import { first_day_of_week, add_days, subtract_days } from "../../utils/date_time";

const Container = ({ children }) => (
  <div className="container mt-3">{children}</div>
);

const Dashboard = ({ hours }) => {
  const [auth] = useAuthContext();
  const [hoursSheet, setHoursSheet] = useState(getHoursSheet());
  const [totals, setTotals] = useState()
  const [firstDay, setFirstDay] = useState(first_day_of_week(new Date()));
  const [isFirstWeek, setIsFirstWeek] = useState(false);

  useEffect(() => {
    (async () => {
      if (hoursSheet) {
        await hours.load();
      }
      if (hours.isLoaded()) {
        setTotals(hours.totals())
      }
    })();
  }, [hoursSheet, hours]);

  const handleSheetSelect = (sheetId) => {
    setHoursSheetId(sheetId);
    setHoursSheet(getHoursSheet());
  };

  const handlePreviousWeek = () => {
    const firstDayOfPrevWeek = subtract_days(firstDay, 7);
    const newTotals = hours.previous();
    if (newTotals === undefined) {
      setIsFirstWeek(true);
      return;
    }
    setIsFirstWeek(false);
    setFirstDay(firstDayOfPrevWeek);
    setTotals(newTotals);
  }

  const handleNextWeek = () => {
    const firstDayOfNextWeek = add_days(firstDay, 7);
    const newTotals = hours.next();
    setIsFirstWeek(false);
    if (newTotals === undefined) {
      return;
    }
    setFirstDay(firstDayOfNextWeek);
    setTotals(newTotals);
  }

  if (!auth.isLoggedIn) {
    return <Container>Please log in.</Container>;
  }

  if (totals) {
    return (
      <Container>
        <DashboardPresenter
          sheetId={hoursSheet.id}
          firstDay={firstDay}
          isFirstWeek={isFirstWeek}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          {...totals}
        />
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
