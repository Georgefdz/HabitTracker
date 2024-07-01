import React from 'react';

const WeekNavigation = ({ currentWeek, startDate, prevWeek, nextWeek }) => {
  return (
    <div className="week-navigation">
      <button onClick={prevWeek} disabled={currentWeek === 0}>Previous Week</button>
      <span>Week {currentWeek + 1} ({startDate.toLocaleDateString()} - {new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()})</span>
      <button onClick={nextWeek}>Next Week</button>
    </div>
  );
};

export default WeekNavigation;