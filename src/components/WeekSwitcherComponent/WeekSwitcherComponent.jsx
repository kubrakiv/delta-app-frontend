import React from "react";

const WeekSwitcherComponent = ({
  year,
  week,
  handleWeekChange,
  handleYearChange,
}) => {
  return (
    <>
      <div className="week-number__container">
        <button
          type="button"
          className="week-number__btn"
          onClick={() => handleWeekChange(week - 1)}
        >
          &lt;
        </button>
        {/* <div className="week-number__number">{week}</div> */}
        <div
          className="week-number__number"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{year}</span>
          <span>Week: {week}</span>
        </div>
        <button
          type="button"
          className="week-number__btn"
          onClick={() => handleWeekChange(week + 1)}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default WeekSwitcherComponent;
