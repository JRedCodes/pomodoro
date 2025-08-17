import React from 'react';

// Controls Component
// This component receives props and event handler functions from its parent
// Props are read-only values, event handlers are functions that get called when user interacts

function Controls({ isRunning, onToggleRun, onReset, onSwitch }) {
  return (
    <div className="controls">
      {/* Play/Pause Button */}
      <button 
        className={`control-btn ${isRunning ? 'pause' : 'play'}`}
        onClick={onToggleRun}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? '⏸️ Pause' : '▶️ Start'}
      </button>
      
      {/* Reset Button - resets current timer to full duration */}
      <button 
        className="control-btn reset"
        onClick={onReset}
        aria-label="Reset timer"
      >
        🔄 Reset
      </button>
      
      {/* Switch Mode Button - manually switch between work and break */}
      <button 
        className="control-btn switch"
        onClick={onSwitch}
        aria-label="Switch between work and break mode"
      >
        🔄 Switch Mode
      </button>
      
      {/* Status indicator */}
      <div className="status">
        Status: {isRunning ? 'Running' : 'Paused'}
      </div>
    </div>
  );
}

export default Controls;
