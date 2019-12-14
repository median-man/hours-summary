export default class HoursSummary {
  constructor({ hours }) {
    this._hours = hours;
  }
  render() {
    const { currentDay, currentWeek } = this._hours;

    return [
      `<p class="h4">Hours Today: ${currentDay.hours.toFixed(2)}</p>`,
      `<p class="h4 pt-3">Hours This Week: ${currentWeek.hours.toFixed(2)}</p>`,
      this.renderDaysTable(),
    ].join('');
  }

  renderDaysTable() {
    const rows = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]
      .map(day => this.renderDaysTableRow(day))
      .join('');
    return `<table class="table mt-5" style="max-width: 400px"><tbody>${rows}</tbody></table>`;
  }

  renderDaysTableRow(day) {
    const th = `<th>${day[0].toUpperCase() + day.substr(1)}</th>`;
    const td = `<td>${this._hours[day].hours.toFixed(2)}</td>`;
    return `<tr>${th}${td}</tr>`;
  }
}
