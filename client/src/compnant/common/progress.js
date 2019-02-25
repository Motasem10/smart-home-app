import React from "react";

const Progress = ({ value, onClick }) => {
  return (
    <div
      className="progress"
 onClick={onClick}
    >
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${value}%`, backgroundColor: "red" }}
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
};

export default Progress;
