import React, { useState, useEffect, useRef } from 'react';
import './HabitTracker.css';
import HabitGraph from './HabitGraph';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const initialLoadDone = useRef(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const levels = {
    0: 'none',
    1: 'easy',
    2: 'medium',
    3: 'hard'
  };

  useEffect(() => {
    if (!initialLoadDone.current) {
      try {
        const savedHabits = JSON.parse(localStorage.getItem('habits'));
        const savedWeek = parseInt(localStorage.getItem('currentWeek'));
        const savedStartDate = localStorage.getItem('startDate');
        
        if (Array.isArray(savedHabits) && savedHabits.length > 0) {
          setHabits(savedHabits);
        }

        if (!isNaN(savedWeek)) {
          setCurrentWeek(savedWeek);
        }

        if (savedStartDate) {
          setStartDate(new Date(savedStartDate));
        }

        initialLoadDone.current = true;
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (initialLoadDone.current) {
      try {
        localStorage.setItem('habits', JSON.stringify(habits));
        localStorage.setItem('currentWeek', currentWeek.toString());
        localStorage.setItem('startDate', startDate.toISOString());
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [habits, currentWeek, startDate]);

  const handleClick = (habitIndex, dayIndex) => {
    const difficulty = prompt("Enter difficulty level (1: Easy, 2: Medium, 3: Hard):");
    const level = parseInt(difficulty);
    if (level >= 1 && level <= 3) {
      setHabits(prevHabits => {
        const newHabits = [...prevHabits];
        if (!newHabits[habitIndex].weeks[currentWeek]) {
          newHabits[habitIndex].weeks[currentWeek] = Array(7).fill(0);
        }
        newHabits[habitIndex].weeks[currentWeek][dayIndex] = level;
        return newHabits;
      });
    } else {
      alert("Invalid difficulty level. Please enter 1, 2, or 3.");
    }
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      setHabits(prevHabits => [
        ...prevHabits,
        { name: newHabitName, weeks: [Array(7).fill(0)] }
      ]);
      setNewHabitName('');
    }
  };

  const resetWeek = (habitIndex) => {
    setHabits(prevHabits => {
      const newHabits = [...prevHabits];
      newHabits[habitIndex].weeks[currentWeek] = Array(7).fill(0);
      return newHabits;
    });
  };

  const deleteHabit = (habitIndex) => {
    setHabits(prevHabits => prevHabits.filter((_, index) => index !== habitIndex));
  };

  const nextWeek = () => {
    setCurrentWeek(prev => prev + 1);
    setStartDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const prevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(prev => prev - 1);
      setStartDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    }
  };

  const calculateTotalDays = (habit) => {
    return habit.weeks.reduce((total, week) => {
      return total + week.filter(day => day > 0).length;
    }, 0);
  };

  const generateGraphData = () => {
    const data = [];
    habits.forEach(habit => {
      habit.weeks.forEach((week, weekIndex) => {
        if (week.some(day => day > 0)) {
          if (!data[weekIndex]) {
            const weekStartDate = new Date(startDate);
            weekStartDate.setDate(weekStartDate.getDate() + weekIndex * 7);
            const weekEndDate = new Date(weekStartDate);
            weekEndDate.setDate(weekEndDate.getDate() + 6);
            data[weekIndex] = {
              name: `Week ${weekIndex + 1} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`,
            };
          }
          data[weekIndex][habit.name] = week.filter(day => day > 0).length;
        }
      });
    });
    return data.filter(Boolean);
  };

  const getDateForDay = (dayIndex) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return date.getDate().toString().padStart(2, '0');
  };

  return (
    <div className="habit-tracker">
      <div className="add-habit">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Enter new habit name"
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>
      <div className="week-navigation">
        <button onClick={prevWeek} disabled={currentWeek === 0}>Previous Week</button>
        <span>Week {currentWeek + 1} ({startDate.toLocaleDateString()} - {new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()})</span>
        <button onClick={nextWeek}>Next Week</button>
      </div>
      {habits.map((habit, habitIndex) => (
        <div key={habitIndex} className="habit-row">
          <div className="habit-name">
            {habit.name} <span className="total-days">({calculateTotalDays(habit)} days)</span>
          </div>
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
          <button onClick={() => resetWeek(habitIndex)}>Reset Week</button>
          <button onClick={() => deleteHabit(habitIndex)}>Delete Habit</button>
        </div>
      ))}
      
      {habits.length > 0 && <HabitGraph data={generateGraphData()} habits={habits} />}
    </div>
  );
};

export default HabitTracker;