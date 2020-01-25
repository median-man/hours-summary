const dayOfWeek = dateIndex => {
  return [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ][dateIndex.getDay()];
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
      saturday: { hours: 0 }
    };

    const convertMsToHours = ms => ms / (1000 * 60 * 60);

    this.thisWeek().forEach(({ startDateTime, endDateTime }) => {
      const hoursWorked = convertMsToHours(endDateTime - startDateTime);
      result[dayOfWeek(startDateTime)].hours += hoursWorked;
      result.currentWeek.hours += hoursWorked;
    });

    result.previousWeek.hours = this.previousWeek().reduce(
      (hours, { startDateTime, endDateTime }) => {
        return hours + convertMsToHours(endDateTime - startDateTime);
      },
      0
    );

    result.currentDay.hours = result[dayOfWeek(new Date())].hours;
    return result;
  }

  thisWeek() {
    return this._getHoursForWeek(this._firstDayOfCurrentWeek());
  }

  previousWeek() {
    const previousWeekBeginDate = this._firstDayOfCurrentWeek();
    previousWeekBeginDate.setDate(previousWeekBeginDate.getDate() - 7);
    return this._getHoursForWeek(previousWeekBeginDate);
  }

  _firstDayOfCurrentWeek() {
    const result = new Date();
    result.setMilliseconds(0);
    result.setSeconds(0);
    result.setMinutes(0);
    result.setHours(0);
    result.setDate(result.getDate() - result.getDay());
    return result;
  }

  _getHoursForWeek(beginDate) {
    const endDate = new Date(beginDate.getTime());
    endDate.setDate(beginDate.getDate() + 7);
    return this._hoursData.filter(
      ({ startDateTime }) =>
        startDateTime >= beginDate && startDateTime < endDate
    );
  }
}
