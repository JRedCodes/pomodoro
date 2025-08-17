import React, { useState } from 'react'

function App() {
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(workMins * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  //handlers
  const 

  
  return (
    <div>

    </div>
  )
}

export default App;
