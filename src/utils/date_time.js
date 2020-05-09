export const convert_ms_to_hours = (ms) => ms / (1000 * 60 * 60);

export const day_of_week = (date_index) => {
  return [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][date_index.getDay()];
};

export const first_day_of_week = (date) => {
  const result = new Date(date.getTime());
  result.setMilliseconds(0);
  result.setSeconds(0);
  result.setMinutes(0);
  result.setHours(0);
  result.setDate(result.getDate() - result.getDay());
  return result;
};

export const subtract_days = (date, days) => {
  return add_days(date, -days);
};

export const add_days = (date, days) => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
};
