import React from "react";
import HoursSheetButton from "./HoursSheetButton";
import CurrentWeekProgress from "./CurrentWeekProgress";
import WeekDaysTable from "./WeekDaysTable";

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
      <HoursSheetButton />
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
