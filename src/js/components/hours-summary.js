import HoursProgressBar from './hours-progress-bar';

const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default class HoursSummary {
  constructor({ hours }) {
    this._hours = hours;
  }
  render() {
    const WEEKLY_HOURS_GOAL = 40;
    const { previousWeek, currentWeek } = this._hours;
    const currentWeekProgressBar = new HoursProgressBar().render({
      goal: WEEKLY_HOURS_GOAL,
      hours: currentWeek.hours,
    });

    return [
      `<p class="h5 pt-3">Current Week:</p>`,
      currentWeekProgressBar,
      `<p class="pt-3">${previousWeek.hours.toFixed(2)} hours last week</p>`,
      this.renderDaysTable(),
    ].join('');
  }

  renderDaysTable() {
    const today = new Date().getDay();
    const isToday = dayIndex => dayIndex === today;
    const rows = weekDays
      .map((day, index) => this.renderDaysTableRow(day, isToday(index)))
      .join('');
    return `<table class="table mt-5" style="max-width: 400px"><tbody>${rows}</tbody></table>`;
  }

  renderDaysTableRow(day, isToday) {
    const td = `<td>${this._hours[day].hours.toFixed(2)}</td>`;
    if (isToday) {
      const badge = '<span class="badge badge-primary">Today!</span>';
      const th = `<th>${day[0].toUpperCase() + day.substr(1)} ${badge}</th>`;
      return `<tr class="table-primary">${th}${td}</tr>`;
    }
    const th = `<th>${day[0].toUpperCase() + day.substr(1)}</th>`;
    return `<tr>${th}${td}</tr>`;
  }
}
