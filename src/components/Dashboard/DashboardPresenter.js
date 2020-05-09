import React from "react";
import HoursSheetButton from "./HoursSheetButton";
import CurrentWeekProgress from "./CurrentWeekProgress";
import WeekDaysTable from "./WeekDaysTable";
import { add_days } from "../../utils/date_time";
import { PrevWeekButton, NextWeekButton } from "./WeekNavigation";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const DashboardPresenter = ({
  sheetId,
  currentWeek,
  previousWeek,
  currentDay,
  firstDay,
  isFirstWeek,
  onPreviousWeek,
  onNextWeek,
  ...days
}) => {
  const goalHoursWorkedThisWeek = 40;
  const hoursWorkedThisWeek = currentWeek.hours;
  const dayOfWeek = daysOfTheWeek[new Date().getDay()];
  const lastDay = add_days(firstDay, 7);
  const is_present_week =
    Date.now() > firstDay.getTime() && Date.now() < add_days(lastDay, 1);
  const tableData = daysOfTheWeek.map((day) => ({
    header: day,
    data: days[day].hours.toFixed(2),
    isToday: day === dayOfWeek && is_present_week,
  }));

  return (
    <>
      <HoursSheetButton sheetId={sheetId} />
      <div className="mt-5">
        <h2 className="h5 pt-3 text-dark">
          {isFirstWeek || <PrevWeekButton onClick={onPreviousWeek} />}
          <span className="px-3">
            {firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}
          </span>
          {is_present_week || <NextWeekButton onClick={onNextWeek} />}
        </h2>
        <CurrentWeekProgress
          value={hoursWorkedThisWeek}
          max={goalHoursWorkedThisWeek}
        />
      </div>
      <WeekDaysTable tableData={tableData} />
    </>
  );
};

export default DashboardPresenter;
