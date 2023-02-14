import React from "react";
import { useCallback, useEffect, useState, useReducer } from "react";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TimerControlButtons from "./components/TimerControlButtons";
import Footer from "./components/Footer";
import TaskPanel from "./components/TaskPanel";
import onFinishRingtoneUrl from "./assets/onFinish-ringtone.mp3";

function App() {
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
  const [workSeconds, setWorkSeconds] = useState(3 * 60);
  const [shortRestSeconds, setShortRestSeconds] = useState(1 * 60);
  const [longRestSeconds, setLongRestSeconds] = useState(2 * 60);
  const [currentSeconds, setCurrentSeconds] = useState(workSeconds);
  const [intervalId, setIntervalId] = useState(null);
  const [isTaskPanelShowing, setIsTaskPanelShowing] = useState(false);

  const setClock = useCallback(() => {
    if (isWorkingSession) setCurrentSeconds(workSeconds);
    else {
      console.log("running rest");
      setCurrentSeconds(
        currentSession === 4 ? longRestSeconds : shortRestSeconds
      );
    }
  }, [isWorkingSession, shortRestSeconds, longRestSeconds, workSeconds]);

  const stopClock = useCallback(() => {
    if (isTimerRunning) {
      toggleTimerRunning();
      clearInterval(intervalId);
    }
  }, [isTimerRunning, intervalId]);

  const onFinish = useCallback(() => {
    stopClock();
    if (!isWorkingSession) setCurrentSession();
    toggleWorkingSession();
  }, [isWorkingSession, stopClock, setClock]);

  useEffect(() => {
    setClock();
  }, [isWorkingSession]);

  useEffect(() => {
    if (currentSeconds === 0) {
      new Audio(onFinishRingtoneUrl).play();
      onFinish();
    }
  }, [currentSeconds]);

  return (
    <Stack className="py-3 vw-100 vh-100">
      <Header
        isWorkingSession={isWorkingSession}
        taskButtonOnClick={() => setIsTaskPanelShowing(true)}
      />
      <Timer
        isWorkingSession={isWorkingSession}
        currentSeconds={currentSeconds}
        totalSeconds={isWorkingSession ? workSeconds : shortRestSeconds}
      />
      <TimerControlButtons
        isTimerRunning={isTimerRunning}
        onStartBtn={startClock}
        onPauseBtn={stopClock}
        onRestartBtn={() => {
          stopClock();
          setClock();
        }}
        onSkipBtn={onFinish}
      />
      <Footer currentSession={currentSession} />
      <TaskPanel
        show={isTaskPanelShowing}
        handleClose={() => setIsTaskPanelShowing(false)}
        className="task-panel"
      />
    </Stack>
  );
}

export default App;
