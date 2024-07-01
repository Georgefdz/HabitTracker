import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, currentWeek, handleClick, resetWeek, deleteHabit, startDate }) => {
  return (
    <div>
      {habits.map((habit, habitIndex) => (
        <HabitItem
          key={habitIndex}
          habit={habit}
          habitIndex={habitIndex}
          currentWeek={currentWeek}
          handleClick={handleClick}
          resetWeek={resetWeek}
          deleteHabit={deleteHabit}
          startDate={startDate}
        />
      ))}
    </div>
  );
};

export default HabitList;