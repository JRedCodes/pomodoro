# Timer Test Guide - Fixing the Cycle Skip Bug

## The Problem
You noticed that when a focus time completes, the cycles counter was skipping by 2 instead of incrementing by 1.

## What Caused It
The issue was likely caused by:
1. **React Strict Mode** - In development, React runs effects twice to help catch bugs
2. **Rapid State Updates** - The timer logic could run multiple times before cleanup
3. **Race Conditions** - Multiple `setInterval` callbacks could execute before state updates

## The Fix
I implemented a **completion flag** using `useRef` that prevents multiple cycle increments:

```javascript
// Add ref to track timer completion
const completionRef = useRef(false);

// In the timer logic:
if (t <= 1 && !completionRef.current) {
  completionRef.current = true; // Mark as completed to prevent multiple updates
  
  if (finishedWork) {
    setCycles(c => c + 1); // Only runs once per completion
  }
  // ... rest of completion logic
}
```

## How to Test the Fix

### 1. **Quick Test (30 seconds)**
- Set work duration to 1 minute
- Set break duration to 1 minute  
- Start the timer
- Watch the console for completion messages
- Verify cycles increment by 1, not 2

### 2. **Full Test (5+ minutes)**
- Use default settings (25 min work, 5 min break)
- Start the timer
- Let it complete a full work session
- Check that cycles go from 0 → 1 (not 0 → 2)
- Let it complete a break session
- Start another work session
- Verify cycles go from 1 → 2

### 3. **Console Debugging**
Open your browser's developer console (F12) and look for:
```
Work session completed! Incrementing cycles from 0 to 1
Timer completed. Switching from work to break
```

## What to Look For

✅ **Good Behavior:**
- Cycles increment by 1 each time
- Console shows exactly one completion message per session
- Timer switches modes cleanly

❌ **Bad Behavior (if bug still exists):**
- Cycles increment by 2 or more
- Multiple console messages for same completion
- Timer behavior seems erratic

## If the Bug Persists

If you still see cycles skipping by 2, the issue might be:
1. **React Strict Mode** - Check if you have `<React.StrictMode>` in your app
2. **Hot Reloading** - Try a full page refresh
3. **Browser Extensions** - Disable React DevTools temporarily

## Additional Debugging

You can add more logging by temporarily adding this to the timer effect:

```javascript
useEffect(() => {
  console.log('Timer effect running with:', { isRunning, mode, workMins, breakMins });
  // ... rest of effect
}, [isRunning, mode, workMins, breakMins]);
```

This will show you exactly when and why the timer effect is re-running.

## Expected Behavior After Fix

- **Work Session**: 25:00 → 00:00 → Cycles +1, Switch to Break
- **Break Session**: 05:00 → 00:00 → Switch to Work  
- **Next Work**: 25:00 → 00:00 → Cycles +1, Switch to Break
- **Total**: 2 work sessions = 2 cycles

The fix ensures each work session completion only increments the cycle counter once, regardless of React's internal behavior or timing issues. 