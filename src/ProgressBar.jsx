import React from 'react';

const ProgressBar = ({ habit, currentWeek }) => {
  const calculateWeeklyProgress = (habit) => {
    const currentWeekData = habit.weeks[currentWeek] || [];
    const completedDays = currentWeekData.filter(day => day > 0).length;
    return (completedDays / 7) * 100;
  };

  const getCompletedDays = (habit) => {
    const currentWeekData = habit.weeks[currentWeek] || [];
    return currentWeekData.filter(day => day > 0).length;
  };

  return (
    <div className="progress-section">
      <div className="progress-label">
        <span>{getCompletedDays(habit)} of 7</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${calculateWeeklyProgress(habit)}%` }}
        ></div>
        <span className="progress-mark start">0%</span>
        <span className="progress-mark end">100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;