import React from "react";
import HoursSheetButton from "./HoursSheetButton";
import CurrentWeekProgress from "./CurrentWeekProgress";
import WeekDaysTable from "./WeekDaysTable";
import { Link } from "react-router-dom";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const DashboardPresenter = ({
  sheetId,
  currentWeek,
  previousWeek,
  currentDay,
  ...days
}) => {
  const goalHoursWorkedThisWeek = 40;
  const hoursWorkedThisWeek = currentWeek.hours;
  const hoursLastWeek = previousWeek.hours;
  const dayOfWeek = daysOfTheWeek[new Date().getDay()]
  const tableData = daysOfTheWeek.map(day => ({
    header: day,
    data: days[day].hours.toFixed(2),
    isToday: day === dayOfWeek
  }));
  return (
    <>
      <Link to="/time-clock" className="btn btn-dark mr-1">Time Clock</Link>
      <HoursSheetButton sheetId={sheetId} />
      <div className="mt-5">
        <h2 className="h5 pt-3">Current Week:</h2>
        <CurrentWeekProgress
          value={hoursWorkedThisWeek}
          max={goalHoursWorkedThisWeek}
        />
        <p className="pt-3">{hoursLastWeek.toFixed(2)} hours last week</p>
      </div>
      <WeekDaysTable tableData={tableData} />
    </>
  );
};

export default DashboardPresenter;
