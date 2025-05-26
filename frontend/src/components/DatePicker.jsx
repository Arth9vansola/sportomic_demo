import React from "react";
import "./DatePicker.css";

const DatePicker = ({ date, setDate }) => {
  return (
    <div className="datepicker-container">
      <label className="datepicker-label">Select Date</label>
      <input
        type="date"
        className="datepicker-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
