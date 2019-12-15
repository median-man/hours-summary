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
    const { previousWeek } = this._hours;
    return [
      `<p class="h5 pt-3">Current Week:</p>`,
      this.renderProgressBar(),
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

  renderProgressBar() {
    const TARGET_HOURS = 40;
    const { hours } = this._hours.currentDay;
    // const hours = 30;
    const percentComplete = Math.floor((hours / TARGET_HOURS) * 100);
    const label = `${hours} / ${TARGET_HOURS}`;
    return `
    <div class="progress" style="max-width: 400px">
      <div
        style="width: ${percentComplete}%"
        class="progress-bar"
        role="progressbar"
        aria-valuenow="${percentComplete}"
        aria-valuemin="0"
        aria-valuemax="100"
      >${label}</div>
    </div>
  `;
  }
}
