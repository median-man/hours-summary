const dayOfWeek = date => {
  return [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ][date.getDay()];
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
      sunday: { hours: 0 },
      monday: { hours: 0 },
      tuesday: { hours: 0 },
      wednesday: { hours: 0 },
      thursday: { hours: 0 },
      friday: { hours: 0 },
      saturday: { hours: 0 },
    };

    const convertMsToHours = ms => ms / (1000 * 60 * 60);

    this.thisWeek().forEach(({ startDateTime, endDateTime }) => {
      const hoursWorked = convertMsToHours(endDateTime - startDateTime);
      result[dayOfWeek(startDateTime)].hours += hoursWorked;
      result.currentWeek.hours += hoursWorked;
    });

    result.currentDay.hours = result[dayOfWeek(new Date())].hours;
    return result;
  }

  thisWeek() {
    const isThisWeek = date => {
      const firstDayOfWeek = new Date();
      firstDayOfWeek.setMilliseconds(0);
      firstDayOfWeek.setSeconds(0);
      firstDayOfWeek.setMinutes(0);
      firstDayOfWeek.setHours(0);
      firstDayOfWeek.setDate(
        firstDayOfWeek.getDate() - firstDayOfWeek.getDay()
      );

      const firstDayOfNextWeek = new Date(firstDayOfWeek.getTime());
      firstDayOfNextWeek.setDate(
        firstDayOfNextWeek.getDate() + 6 - firstDayOfWeek.getDay()
      );

      return date >= firstDayOfWeek && date < firstDayOfNextWeek;
    };
    return this._hoursData.filter(item => isThisWeek(item.startDateTime));
  }
}
