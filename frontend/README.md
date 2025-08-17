# Pomodoro Timer App

A simple Pomodoro timer built with React to help you understand React hooks and component architecture.

## What is this app?

This is a Pomodoro timer that helps you stay focused by alternating between work sessions and break sessions. It demonstrates key React concepts like:

- **useState** - Managing component state
- **useEffect** - Handling side effects and lifecycle
- **Component composition** - Breaking UI into reusable pieces
- **Props** - Passing data between components
- **Event handling** - Responding to user interactions

## How to run the app

1. Make sure you have Node.js installed
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser to `http://localhost:3000`

## App Features

- **Work Timer**: Default 25-minute focus sessions
- **Break Timer**: Default 5-minute break sessions
- **Cycle Counter**: Tracks completed work sessions
- **Settings**: Adjustable work and break durations
- **Persistence**: Saves your settings and progress
- **Browser Title**: Shows current timer in browser tab

## Understanding the Code

### App.jsx (Main Component)
This is the "brain" of the app that manages all the state and logic using React hooks.

**Key useState examples:**
```javascript
const [isRunning, setIsRunning] = useState(false);
const [timeLeft, setTimeLeft] = useState(workMins * 60);
const [mode, setMode] = useState('work');
```

**Key useEffect examples:**
```javascript
// Timer ticker
useEffect(() => {
  if (!isRunning) return;
  const id = setInterval(() => {
    setTimeLeft(t => t - 1);
  }, 1000);
  return () => clearInterval(id);
}, [isRunning]);

// Save to localStorage
useEffect(() => {
  localStorage.setItem('pomodoro', JSON.stringify({
    workMins, breakMins, mode, timeLeft, isRunning, cycles
  }));
}, [workMins, breakMins, mode, timeLeft, isRunning, cycles]);
```

### Component Architecture

1. **TimerDisplay** - Shows the countdown timer and progress bar
2. **Controls** - Start/pause, reset, and mode switching buttons
3. **SettingsPanel** - Input fields for adjusting timer durations
4. **CycleCounter** - Displays completed work cycles

## Key React Concepts Demonstrated

### useState Hook
- Manages component state (data that can change)
- Returns current value and setter function
- Triggers re-renders when state changes

### useEffect Hook
- Handles side effects (timers, API calls, DOM updates)
- Runs after component renders
- Can have dependencies to control when it runs
- Can return cleanup functions

### Props
- Way to pass data from parent to child components
- Read-only in child components
- Can include functions for child-to-parent communication

### Component Composition
- Breaking UI into smaller, reusable pieces
- Each component has a single responsibility
- Makes code easier to understand and maintain

## Try These Experiments

1. **Change the timer duration** - See how the UI updates immediately
2. **Start the timer** - Watch the countdown and progress bar
3. **Switch modes** - See how the app transitions between work and break
4. **Refresh the page** - Notice how your settings are preserved
5. **Check the browser title** - See the timer updating in real-time

## Learning Resources

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [useState Hook](https://react.dev/reference/react/useState)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [React Components](https://react.dev/learn/your-first-component)

Happy coding! 🚀
