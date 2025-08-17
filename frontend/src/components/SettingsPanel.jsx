import React from 'react';

// SettingsPanel Component
// This component demonstrates controlled inputs and how they interact with parent state
// The parent (App.jsx) owns the state, this component just displays and allows editing

function SettingsPanel({ workMins, breakMins, onChangeWork, onChangeBreak, disabled }) {
  return (
    <div className="settings-panel">
      <h2>Timer Settings</h2>
      
      <div className="setting-group">
        <label htmlFor="work-duration">
          Work Duration (minutes):
        </label>
        <input
          id="work-duration"
          type="number"
          min="1"
          max="90"
          value={workMins}
          onChange={(e) => onChangeWork(e.target.value)}
          disabled={disabled}
          className="setting-input"
        />
        <span className="setting-hint">
          Range: 1-90 minutes
        </span>
      </div>
      
      <div className="setting-group">
        <label htmlFor="break-duration">
          Break Duration (minutes):
        </label>
        <input
          id="break-duration"
          type="number"
          min="1"
          max="30"
          value={breakMins}
          onChange={(e) => onChangeBreak(e.target.value)}
          disabled={disabled}
          className="setting-input"
        />
        <span className="setting-hint">
          Range: 1-30 minutes
        </span>
      </div>
      
      {/* Show current settings summary */}
      <div className="current-settings">
        <p>
          Current: {workMins} min work, {breakMins} min break
        </p>
        {disabled && (
          <p className="warning">
            ⚠️ Settings locked while timer is running
          </p>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;
