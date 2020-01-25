import React from "react";

const CurrentWeekProgress = ({ value = 0, min = 0, max = 100 }) => {
  const percentOfGoal = ((value - min) * 100) / (max - min);
  return (
    <div className="progress" style={{ maxWidth: 400 }}>
      <div
        style={{ width: `${percentOfGoal}%` }}
        className="progress-bar"
        role="progressbar"
        aria-valuenow={value.toFixed(1)}
        aria-valuemin={min.toFixed()}
        aria-valuemax={max.toFixed()}
      >
        {value.toFixed(1)} / {max.toFixed()}
      </div>
    </div>
  );
};

export default CurrentWeekProgress;
