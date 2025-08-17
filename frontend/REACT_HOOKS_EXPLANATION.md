# Understanding React Hooks: useState and useEffect

## What are React Hooks?

React Hooks are functions that allow you to "hook into" React state and lifecycle features from function components. Before hooks, you had to use class components to access state and lifecycle methods.

## useState Hook

### What it does:
`useState` is a hook that lets you add state to functional components. It returns an array with two elements:
1. **Current state value**
2. **Function to update the state**

### Basic Syntax:
```javascript
const [state, setState] = useState(initialValue);
```

### Examples from our Pomodoro app:

#### 1. Simple State:
```javascript
const [isRunning, setIsRunning] = useState(false);
```
- `isRunning` is the current state (starts as `false`)
- `setIsRunning` is the function to update it
- `false` is the initial value

#### 2. State with Calculations:
```javascript
const [timeLeft, setTimeLeft] = useState(workMins * 60);
```
- `timeLeft` starts as `workMins * 60` (converting minutes to seconds)
- `setTimeLeft` updates the countdown

#### 3. Multiple State Variables:
```javascript
const [workMins, setWorkMins] = useState(25);
const [breakMins, setBreakMins] = useState(5);
const [mode, setMode] = useState('work');
```
Each piece of state is independent and can be updated separately.

### How to Update State:

#### Direct Update:
```javascript
setIsRunning(true);  // Sets isRunning to true
```

#### Functional Update (prevents stale reads):
```javascript
setIsRunning(v => !v);  // Toggles the current value
```

#### Update Based on Other State:
```javascript
setMode(m => {
  const next = m === 'work' ? 'break' : 'work';
  setTimeLeft((next === 'work' ? workMins : breakMins) * 60);
  return next;
});
```

## useEffect Hook

### What it does:
`useEffect` lets you perform side effects in function components. Side effects are operations like:
- Data fetching
- Setting up subscriptions
- Manually changing the DOM
- Setting up timers
- Local storage operations

### Basic Syntax:
```javascript
useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code here (optional)
  };
}, [dependencies]);
```

### Examples from our Pomodoro app:

#### 1. Effect with No Dependencies (runs once on mount):
```javascript
useEffect(() => {
  const raw = localStorage.getItem('pomodoro');
  if (!raw) return;
  try {
    const s = JSON.parse(raw);
    if (typeof s.workMins === 'number') setWorkMins(s.workMins);
    if (typeof s.breakMins === 'number') setBreakMins(s.breakMins);
    // ... more state restoration
  } catch {
    // ignore parse errors
  }
}, []); // Empty dependency array = runs once on mount
```

#### 2. Effect with Dependencies (runs when dependencies change):
```javascript
useEffect(() => {
  if (isRunning) return;
  setTimeLeft(totalSeconds);
}, [isRunning, totalSeconds]); // Runs when isRunning or totalSeconds changes
```

#### 3. Effect with Cleanup (important for timers):
```javascript
useEffect(() => {
  if (!isRunning) return;

  const id = setInterval(() => {
    setTimeLeft(t => {
      if (t <= 1) {
        // Timer finished logic
        const finishedWork = mode === 'work';
        const nextMode = finishedWork ? 'break' : 'work';
        
        if (finishedWork) setCycles(c => c + 1);
        
        setMode(nextMode);
        return (nextMode === 'work' ? workMins : breakMins) * 60;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(id); // Cleanup: clear interval when component unmounts
}, [isRunning, mode, workMins, breakMins]);
```

#### 4. Effect for Browser Title Updates:
```javascript
useEffect(() => {
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  document.title = `${mm}:${ss} • ${mode === 'work' ? 'Focus' : 'Break'}`;
}, [timeLeft, mode]); // Updates title when time or mode changes
```

#### 5. Effect for Persistence:
```javascript
useEffect(() => {
  localStorage.setItem('pomodoro', JSON.stringify({
    workMins, breakMins, mode, timeLeft, isRunning, cycles
  }));
}, [workMins, breakMins, mode, timeLeft, isRunning, cycles]); // Saves to localStorage when any state changes
```

## Key Concepts to Remember:

### 1. State Updates are Asynchronous:
```javascript
setTimeLeft(30);
console.log(timeLeft); // Still shows old value!
// Use useEffect to react to state changes
```

### 2. Dependencies Matter:
- **Empty array `[]`**: Runs once on mount
- **No array**: Runs after every render (usually not what you want)
- **Array with values**: Runs when those values change

### 3. Cleanup is Important:
```javascript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  
  return () => clearInterval(timer); // Prevents memory leaks
}, []);
```

### 4. Functional Updates Prevent Stale Closures:
```javascript
// ❌ Bad - might use stale value
setCycles(cycles + 1);

// ✅ Good - always uses current value
setCycles(c => c + 1);
```

## How Our App Works:

1. **App.jsx** manages all the state using `useState`
2. **Components** receive state and update functions as props
3. **useEffect** handles side effects like timers, localStorage, and DOM updates
4. **State changes** trigger re-renders, updating the UI
5. **Event handlers** call state update functions, triggering the cycle again

This creates a reactive system where the UI automatically updates whenever the underlying data changes! 