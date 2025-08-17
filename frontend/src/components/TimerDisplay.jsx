import React from 'react';

// TimerDisplay Component
// This component receives props from its parent (App.jsx)
// Props are like parameters that get passed down from parent to child
// In this case, we receive: timeLeft, totalSeconds, and mode

function TimerDisplay({ timeLeft, totalSeconds, mode }) {
  // Calculate the percentage of time remaining for the progress bar
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  
  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format time with leading zeros (e.g., "25:00" instead of "25:0")
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Determine the color based on current mode
  const progressColor = mode === 'work' ? '#ef4444' : '#10b981'; // red for work, green for break
  
  return (
    <div className="timer-display">
      {/* Display the current mode */}
      <div className="mode-indicator">
        {mode === 'work' ? 'Focus Time' : 'Break Time'}
      </div>
      
      {/* The main timer display */}
      <div className="time-display">
        {formattedTime}
      </div>
      
      {/* Progress bar showing how much time has elapsed */}
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: progressColor,
            transition: 'width 1s linear'
          }}
        />
      </div>
      
      {/* Show remaining time in a more readable format */}
      <div className="time-remaining">
        {minutes > 0 ? `${minutes} min ${seconds > 0 ? `${seconds}s` : ''}`.trim() : `${seconds}s`} remaining
      </div>
    </div>
  );
}

export default TimerDisplay;
