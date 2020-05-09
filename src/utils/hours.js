import {
  day_of_week,
  convert_ms_to_hours,
  first_day_of_week,
  subtract_days,
  add_days,
} from "./date_time";

function find_earliest(hours_data) {
  return hours_data.reduce((earliest, item) =>
    item.startDateTime < earliest.startDateTime ? item : earliest
  );
}

export const create_hours = ({ sheetsApi: sheets_api }) => {
  let week_cursor = first_day_of_week(new Date());
  let is_hours_data_loaded = false;
  let first_week_at_date;
  const hours_data = [];

  function load() {
    return sheets_api
      .fetchHours()
      .then((data) => {
        is_hours_data_loaded = true;
        hours_data.push(...data);
        if (data.length > 0) {
          first_week_at_date = first_day_of_week(
            find_earliest(hours_data).startDateTime
          );
        }
      })
      .catch(console.error);
  }

  function is_loaded() {
    return is_hours_data_loaded;
  }

  function totals() {
    const result = {
      currentWeek: { hours: 0 },
      currentDay: { hours: 0 },
      previousWeek: { hours: 0 },
      sunday: { hours: 0 },
      monday: { hours: 0 },
      tuesday: { hours: 0 },
      wednesday: { hours: 0 },
      thursday: { hours: 0 },
      friday: { hours: 0 },
      saturday: { hours: 0 },
    };

    current_week_data().forEach(({ startDateTime, endDateTime }) => {
      const hoursWorked = convert_ms_to_hours(endDateTime - startDateTime);
      result[day_of_week(startDateTime)].hours += hoursWorked;
      result.currentWeek.hours += hoursWorked;
    });

    result.previousWeek.hours = previous_week_data().reduce(
      (hours, { startDateTime, endDateTime }) => {
        return hours + convert_ms_to_hours(endDateTime - startDateTime);
      },
      0
    );

    result.currentDay.hours = result[day_of_week(new Date())].hours;
    return result;
  }

  function current_week_data() {
    return get_hours_for_week(week_cursor);
  }

  function previous_week_data() {
    const previousWeekBeginDate = subtract_days(week_cursor, 7);
    return get_hours_for_week(previousWeekBeginDate);
  }

  function get_hours_for_week(beginDate) {
    const endDate = new Date(beginDate.getTime());
    endDate.setDate(beginDate.getDate() + 7);
    return hours_data.filter(
      ({ startDateTime }) =>
        startDateTime >= beginDate && startDateTime < endDate
    );
  }

  function set_week(date) {
    week_cursor = first_day_of_week(date);
  }

  function previous() {
    const prev_week_at = subtract_days(week_cursor, 7) 
    if (prev_week_at < first_week_at_date) {
      return;
    }
    week_cursor = prev_week_at;
    return totals();
  }

  function next() {
    const next_week_at = add_days(week_cursor, 7)
    if (Date.now() < next_week_at.getTime()) {
      return;
    }
    week_cursor = next_week_at;
    return totals();
  }

  return Object.freeze({
    isLoaded: is_loaded,
    load,
    next,
    previous,
    set_week,
    totals,
  });
};
