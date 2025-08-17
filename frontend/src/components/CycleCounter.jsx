import React from 'react';

// CycleCounter Component
// This is a simple display component that shows the number of completed work cycles
// It receives the cycles count as a prop and just displays it

function CycleCounter({ cycles }) {
  return (
    <div className="cycle-counter">
      <h3>Completed Cycles</h3>
      
      <div className="cycle-display">
        <span className="cycle-number">{cycles}</span>
        <span className="cycle-label">
          {cycles === 1 ? 'cycle' : 'cycles'}
        </span>
      </div>
      
      {/* Show a motivational message based on cycles completed */}
      <div className="cycle-message">
        {cycles === 0 && "Start your first focus session!"}
        {cycles === 1 && "Great start! Keep going!"}
        {cycles === 2 && "Two cycles down! You're building momentum!"}
        {cycles === 3 && "Three cycles! You're in the zone!"}
        {cycles >= 4 && `Amazing! ${cycles} cycles completed! You're unstoppable!`}
      </div>
      
      {/* Show estimated time spent working */}
      {cycles > 0 && (
        <div className="time-summary">
          Total focus time: {cycles * 25} minutes
          <br />
          <small>(assuming 25-minute work sessions)</small>
        </div>
      )}
    </div>
  );
}

export default CycleCounter;
