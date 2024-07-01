import React from 'react';
import ProgressBar from './ProgressBar';

const HabitItem = ({ habit, habitIndex, currentWeek, handleClick, resetWeek, deleteHabit, startDate }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const levels = {
    0: 'none',
    1: 'easy',
    2: 'medium',
    3: 'hard'
  };

  const calculateTotalDays = (habit) => {
    return habit.weeks.reduce((total, week) => {
      return total + week.filter(day => day > 0).length;
    }, 0);
  };

  const getDateForDay = (dayIndex) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return date.getDate().toString().padStart(2, '0');
  };

  const getCompletedDays = (habit) => {
    const currentWeekData = habit.weeks[currentWeek] || [];
    return currentWeekData.filter(day => day > 0).length;
  };

  return (
    <div className="habit-row">
      <div className="habit-name">
        {habit.name} <span className="total-days">({calculateTotalDays(habit)} days)</span>
      </div>
      <div className="habit-data">
        <div className="habit-squares">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="day-label">{getDateForDay(dayIndex)}</div>
              <div className="day-label">{day}</div>
              <div
                className={`habit-square ${levels[habit.weeks[currentWeek]?.[dayIndex] || 0]}`}
                onClick={() => handleClick(habitIndex, dayIndex)}
              />
            </div>
          ))}
        </div>
        <ProgressBar habit={habit} currentWeek={currentWeek} />
      </div>
      <div className="habit-actions">
        <button onClick={() => resetWeek(habitIndex)}>Reset Week</button>
        <button onClick={() => deleteHabit(habitIndex)}>Delete Habit</button>
      </div>
    </div>
  );
};

export default HabitItem;