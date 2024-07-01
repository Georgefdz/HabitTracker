import React, { useState } from 'react';

const HabitForm = ({ addHabit }) => {
  const [newHabitName, setNewHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit(newHabitName);
      setNewHabitName('');
    }
  };

  return (
    <form className="add-habit" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newHabitName}
        onChange={(e) => setNewHabitName(e.target.value)}
        placeholder="Enter new habit name"
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;