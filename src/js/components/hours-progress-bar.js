export default class HoursProgressBar {
  render({ goal, hours }) {
    const percent = Math.floor((hours / goal) * 100);
    const label = this.renderLabel({ percent, hours, goal });

    return `
    <div class="progress" style="max-width: 400px">
      <div
        style="width: ${percent}%"
        class="progress-bar"
        role="progressbar"
        aria-valuenow="${percent}"
        aria-valuemin="0"
        aria-valuemax="100"
      >${label}</div>
    </div>
  `;
  }

  renderLabel({ percent, hours, goal }) {
    if (percent < 10) {
      return '';
    } else if (percent <= 25) {
      return hours.toFixed();
    }
    return `${hours.toFixed()} / ${goal}`;
  }
}
