import React from "react";
import { useCallback, useEffect, useState, useReducer } from "react";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TimerControlButtons from "./components/TimerControlButtons";
import Footer from "./components/Footer";

function App() {
  const setNewClock = (minutes, seconds) => {
    setCurrentSeconds(minutes * 60 + seconds);
  };

  const startClock = () => {
    toggleTimerRunning();
    const id = setInterval(() => {
      setCurrentSeconds((seconds) => {
        if (seconds > 0) return seconds - 1;
        return 0;
      });
    }, 1000);
    setIntervalId(id);
  };

  // Play pause state
  const [isTimerRunning, toggleTimerRunning] = useReducer(
    (currentState) => !currentState,
    false
  );

  const [isWorkingSession, toggleWorkingSession] = useReducer(
    (currentState) => !currentState,
    true
  );

  const [currentSession, setCurrentSession] = useReducer(
    (session, resetSession) => {
      if (resetSession) return resetSession;
      if (session < 4) return session + 1;
      return 1;
    },
    1
  );
  const [currentSeconds, setCurrentSeconds] = useState(1);
  const [intervalId, setIntervalId] = useState(null);

  const stopClock = useCallback(() => {
    if (isTimerRunning) {
      toggleTimerRunning();
      clearInterval(intervalId);
    }
  }, [isTimerRunning, intervalId]);

  const restartSession = useCallback(() => {
    if (isWorkingSession) setNewClock(30, 0);
    else setNewClock(5, 0);
  }, [isWorkingSession]);

  const onFinish = useCallback(() => {
    stopClock();
    if (isWorkingSession) setNewClock(5, 0);
    else {
      setNewClock(30, 0);
      setCurrentSession();
    }
    toggleWorkingSession();
  }, [isWorkingSession, stopClock]);

  useEffect(() => {
    setNewClock(30, 0);
  }, []);

  useEffect(() => {
    if (currentSeconds === 0) onFinish();
  }, [currentSeconds]);

  return (
    <Stack className="py-3 vw-100 vh-100">
      <Header />
      <Timer
        isWorking={isWorkingSession}
        toggleWorkingSession={toggleWorkingSession}
        currentSeconds={currentSeconds}
      />
      <TimerControlButtons
        isTimerRunning={isTimerRunning}
        onStartBtn={startClock}
        onPauseBtn={stopClock}
        onStopBtn={() => {
          stopClock();
          restartSession();
        }}
        onRestartBtn={restartSession}
        onSkipBtn={onFinish}
      />
      <Footer currentSession={currentSession} />
    </Stack>
  );
}

export default App;
