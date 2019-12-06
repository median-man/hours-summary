const MS_PER_DAY = 1.15741e-8;

const isToday = date => {
  return (
    Math.floor(date.getTime() / MS_PER_DAY) ===
    Math.floor(Date.now() / MS_PER_DAY)
  );
};

const isThisWeek = date => {
  const firstDayOfWeek = new Date();
  firstDayOfWeek.setMilliseconds(0);
  firstDayOfWeek.setSeconds(0);
  firstDayOfWeek.setMinutes(0);
  firstDayOfWeek.setHours(0);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

  const firstDayOfNextWeek = new Date(firstDayOfWeek.getTime());
  firstDayOfNextWeek.setDate(
    firstDayOfNextWeek.getDate() + 6 - firstDayOfWeek.getDay()
  );

  return date >= firstDayOfWeek && date < firstDayOfNextWeek;
};
export class Hours {
  constructor({ sheetsApi }) {
    this._sheetsApi = sheetsApi;
    this._isHoursDataLoaded = false;
  }
  load() {
    return this._sheetsApi
      .fetchHours()
      .then(data => {
        this._isHoursDataLoaded = true;
        this._hoursData = data;
      })
      .catch(console.error);
  }
  isLoaded() {
    return this._isHoursDataLoaded;
  }
  totals() {
    const convertMsToHours = ms => ms / (1000 * 60 * 60);
    const hours = this._hoursData;
    const thisWeek = hours.filter(item => isThisWeek(item.startDateTime));
    const totalMsThisWeek = thisWeek.reduce(
      (ms, item) =>
        ms + item.endDateTime.getTime() - item.startDateTime.getTime(),
      0
    );
    const totalHoursThisWeek = convertMsToHours(totalMsThisWeek);

    const thisDay = thisWeek.filter(item => isToday(item.startDateTime));
    const totalMsToday = thisDay.reduce(
      (ms, item) =>
        ms + item.endDateTime.getTime() - item.startDateTime.getTime(),
      0
    );
    const totalHoursThisDay = convertMsToHours(totalMsToday);
    return {
      currentWeek: {
        hours: totalHoursThisWeek,
      },
      currentDay: {
        hours: totalHoursThisDay,
      },
    };
  }
}
