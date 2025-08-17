import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from "./components/TimerDisplay.jsx";
import Controls from "./components/Controls.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import CycleCounter from "./components/CycleCounter.jsx";
import './App.css';

function App() {
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [mode, setMode] = useState('work');         // 'work' | 'break'
  const [timeLeft, setTimeLeft] = useState(workMins * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  // Add ref to track last completion time to prevent rapid re-execution
  const lastCompletionRef = useRef(0);

  // Add notification permission state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Add state for visual alerts
  const [visualAlert, setVisualAlert] = useState(null);

  // util & derived
  const clamp = (n, min, max) => Math.min(Math.max(Number(n) || 0, min), max);
  const totalSeconds = (mode === "work" ? workMins : breakMins) * 60;

  // Function to request notification permission and show notifications
  const requestNotificationPermission = async () => {
    console.log('Requesting notification permission...');
    if ('Notification' in window) {
      console.log('Notifications API is supported');
      const permission = await Notification.requestPermission();
      console.log('Permission result:', permission);
      setNotificationsEnabled(permission === 'granted');
      return permission === 'granted';
    } else {
      console.log('Notifications API not supported');
      return false;
    }
  };

  // Function to show notification with multiple fallbacks
  const showNotification = (title, body) => {
    console.log('Attempting to show notification:', { title, body, notificationsEnabled });
    
    // Fallback 1: Try desktop notification
    if (notificationsEnabled && 'Notification' in window) {
      try {
        const notification = new Notification(title, {
          body: body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'pomodoro-timer',
          requireInteraction: true, // Make it stay until clicked
          silent: false
        });
        console.log('Notification created successfully:', notification);
        
        // Add event listeners for debugging
        notification.onclick = () => {
          console.log('Notification clicked');
          window.focus();
        };
        
        notification.onshow = () => {
          console.log('Notification shown');
        };
        
        notification.onerror = (error) => {
          console.error('Notification error:', error);
        };
        
        notification.onclose = () => {
          console.log('Notification closed');
        };
        
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
    
    // Fallback 2: Audio alert
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio notification failed:', error);
    }
    
    // Fallback 3: Visual alert in the app
    setVisualAlert({ title, body, timestamp: Date.now() });
    
    // Fallback 4: Browser tab title flash
    const originalTitle = document.title;
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      document.title = flashCount % 2 === 0 ? `🔔 ${title}` : originalTitle;
      flashCount++;
      if (flashCount >= 6) { // Flash 3 times
        clearInterval(flashInterval);
        document.title = originalTitle;
      }
    }, 500);
    
    // Fallback 5: Console alert
    console.log(`🔔 NOTIFICATION: ${title} - ${body}`);
  };

  // ---- handlers ----
  const toggleRun = () => {
    setIsRunning(v => !v); // functional update avoids stale reads
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft((mode === 'work' ? workMins : breakMins) * 60);
    lastCompletionRef.current = 0; // Reset completion time
  };

  const switchMode = () => {
    setIsRunning(false);
    lastCompletionRef.current = 0; // Reset completion time
    setMode(m => {
      const next = m === 'work' ? 'break' : 'work';
      setTimeLeft((next === 'work' ? workMins : breakMins) * 60);
      return next;
    });
  };

  // Rename to avoid colliding with React setters:
  const onChangeWork = (n) => {
    const val = clamp(n, 1, 90);
    setWorkMins(val);
    // keep UI snappy while paused
    if (!isRunning && mode === 'work') setTimeLeft(val * 60);
  };

  const onChangeBreak = (n) => {
    const val = clamp(n, 1, 30);
    setBreakMins(val);
    if (!isRunning && mode === 'break') setTimeLeft(val * 60);
  };

  // ---- effects ----

  // 1) Restore saved state on first mount
  useEffect(() => {
    const raw = localStorage.getItem('pomodoro');
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      if (typeof s.workMins === 'number') setWorkMins(s.workMins);
      if (typeof s.breakMins === 'number') setBreakMins(s.breakMins);
      if (s.mode === 'work' || s.mode === 'break') setMode(s.mode);
      if (typeof s.timeLeft === 'number' && s.timeLeft > 0) setTimeLeft(s.timeLeft);
      if (typeof s.cycles === 'number') setCycles(s.cycles);
      setIsRunning(false); // always start paused after reload
    } catch {
      // ignore parse errors
    }

    // Request notification permission on first load
    requestNotificationPermission();
  }, []);

  // 2) Keep timeLeft in sync while paused - REMOVED (was causing pause to reset timer)
  // This effect was resetting timeLeft every time isRunning changed, breaking pause/resume

  // 3) Ticking interval (auto-switch + increment cycles after work)
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          const now = Date.now();
          const timeSinceLastCompletion = now - lastCompletionRef.current;
          
          // Prevent rapid re-execution (less than 2 seconds between completions)
          if (timeSinceLastCompletion < 2000) {
            return 0; // Stay at 0 until enough time has passed
          }
          
          // Record completion time
          lastCompletionRef.current = now;
          
          // Use functional updates to ensure we're working with current state
          setMode(currentMode => {
            const finishedWork = currentMode === 'work';
            const nextMode = finishedWork ? 'break' : 'work';
            
            if (finishedWork) {
              // Increment cycles only when work session completes
              setCycles(c => c + 1);
              
              console.log('Work session completed, showing notification...');
              // Show notification for work completion
              showNotification(
                'Work Session Complete! 🎯',
                `Great job! Take a ${breakMins}-minute break. Cycles completed: ${cycles + 1}`
              );
            } else {
              console.log('Break session completed, showing notification...');
              // Show notification for break completion
              showNotification(
                'Break Complete! ⏰',
                `Break time is over. Ready for your next ${workMins}-minute focus session?`
              );
            }
            
            // Set the new time based on the next mode
            setTimeLeft(nextMode === 'work' ? workMins * 60 : breakMins * 60);
            
            return nextMode;
          });
          
          // Return 0 to stay at completion state until mode change processes
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, workMins, breakMins]);

  // 4) Update browser tab title
  useEffect(() => {
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const ss = String(timeLeft % 60).padStart(2, '0');
    document.title = `${mm}:${ss} • ${mode === 'work' ? 'Focus' : 'Break'}`;
  }, [timeLeft, mode]);

  // 5) Persist state whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoro', JSON.stringify({
      workMins, breakMins, mode, timeLeft, isRunning, cycles
    }));
  }, [workMins, breakMins, mode, timeLeft, isRunning, cycles]);

  return (
    <div className="container">
      <h1 className="title">Pomodoro</h1>
      
      {/* Notification Permission Button */}
      {!notificationsEnabled && (
        <div className="notification-permission">
          <button 
            onClick={requestNotificationPermission}
            className="notification-btn"
          >
            🔔 Enable Notifications
          </button>
          <p className="notification-hint">
            Get notified when work sessions and breaks complete, even in other windows!
          </p>
        </div>
      )}
      
      {notificationsEnabled && (
        <div className="notification-status">
          ✅ Notifications enabled
        </div>
      )}
      
      {/* Visual Alert Component */}
      {visualAlert && (
        <div className="visual-alert" onClick={() => setVisualAlert(null)}>
          <div className="alert-content">
            <h3>🔔 {visualAlert.title}</h3>
            <p>{visualAlert.body}</p>
            <small>Click to dismiss</small>
          </div>
        </div>
      )}
  
      <SettingsPanel
        workMins={workMins}
        breakMins={breakMins}
        onChangeWork={onChangeWork}      // calls setWorkMins internally (with clamp)
        onChangeBreak={onChangeBreak}    // calls setBreakMins internally (with clamp)
        disabled={isRunning}             // lock inputs while running
      />
  
      <TimerDisplay
        timeLeft={timeLeft}
        totalSeconds={totalSeconds}
        mode={mode}
      />
  
      <Controls
        isRunning={isRunning}
        onToggleRun={toggleRun}
        onReset={reset}
        onSwitch={switchMode}
      />
  
      <CycleCounter cycles={cycles} />
    </div>
  );
}

export default App;
