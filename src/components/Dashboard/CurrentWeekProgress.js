import React from "react";

const CurrentWeekProgress = ({ value = 0, min = 0, max = 100 }) => {
  return (
    <div className="progress" style={{ maxWidth: 400 }}>
      <div
        style={{ width: `${(value - min) * 100 / (max - min)}%` }}
        className="progress-bar"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {value} / {max}
      </div>
    </div>
  );
};

export default CurrentWeekProgress;
