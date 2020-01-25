import React from "react";
import HoursSheetButton from "./HoursSheetButton";
import CurrentWeekProgress from "./CurrentWeekProgress";
import WeekDaysTable from "./WeekDaysTable";

const DashboardPresenter = () => {
  const hoursWorkedThisWeek = 29;
  const goalHoursWorkedThisWeek = 40;
  const hoursLastWeek = 53.43;
  return (
    <>
      <HoursSheetButton />
      <div className="mt-5">
        <h2 className="h5 pt-3">Current Week:</h2>
        <CurrentWeekProgress
          value={hoursWorkedThisWeek}
          max={goalHoursWorkedThisWeek}
        />
        <p className="pt-3">{hoursLastWeek} hours last week</p>
      </div>
      <WeekDaysTable />
    </>
  );
};

export default DashboardPresenter;
