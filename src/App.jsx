import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import onFinishRingtoneUrl from "./assets/onFinish-ringtone.mp3";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskPanel from "./components/TaskPanel";
import Timer from "./components/Timer";
import TimerControlButtons from "./components/TimerControlButtons";
import useInterval from "./hooks/useInterval";

function App() {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [prevSessionNumber, setPrevSessionNumber] = useState(0);
  const [sessionNumber, setSessionNumber] = useState(1);

  const [maxSession, setMaxSession] = useState(4 * 2);
  const [workSeconds, setWorkSeconds] = useState(10);
  const [shortRestSeconds, setShortRestSeconds] = useState(5);
  const [longRestSeconds, setLongRestSeconds] = useState(2 * 60);
  const [currentSeconds, setCurrentSeconds] = useState(workSeconds);
  const [isTaskPanelShowing, setIsTaskPanelShowing] = useState(false);

  const runAfterOneSecond = () => setCurrentSeconds(currentSeconds - 1);

  useInterval(runAfterOneSecond, isTimerRunning ? 1000 : null);

  const setClock = (time) => {
    setCurrentSeconds(time);
  };

  const startClock = () => setTimerRunning(true);

  const stopClock = () => setTimerRunning(false);

  const onFinish = () => {
    stopClock();
    setSessionNumber((session) => {
      if (session < maxSession) return session + 1;
      else return 1;
    });
  };

  useEffect(() => {
    if (currentSeconds === 0) {
      setTimeout(() => {
        onFinish();
        new Audio(onFinishRingtoneUrl).play();
      }, 300);
    }
  }, [currentSeconds]);

  if (sessionNumber !== prevSessionNumber) {
    if (sessionNumber % 2 == 0 && sessionNumber === maxSession) {
      setClock(longRestSeconds);
    } else if (sessionNumber % 2 == 0) {
      setClock(shortRestSeconds);
    } else {
      setClock(workSeconds);
    }
    setPrevSessionNumber(sessionNumber);
  }

  return (
    <Stack className="py-3 vw-100 vh-100">
      <Header
        isWorkingSession={sessionNumber % 2 !== 0}
        taskButtonOnClick={() => setIsTaskPanelShowing(true)}
      />
      <Timer
        isWorkingSession={sessionNumber % 2 !== 0}
        currentSeconds={currentSeconds}
        totalSeconds={
          sessionNumber % 2 !== 0
            ? workSeconds
            : sessionNumber !== maxSession
            ? shortRestSeconds
            : longRestSeconds
        }
      />
      <TimerControlButtons
        isTimerRunning={isTimerRunning}
        onStartBtn={startClock}
        onPauseBtn={stopClock}
        onRestartBtn={() => {
          stopClock();
          setClock(
            sessionNumber % 2 !== 0
              ? workSeconds
              : sessionNumber !== maxSession
              ? shortRestSeconds
              : longRestSeconds
          );
        }}
        onSkipBtn={onFinish}
      />
      <Footer
        currentSession={Math.ceil(sessionNumber / 2)}
        maxSession={maxSession / 2}
        onRestartSession={() => setSessionNumber(1)}
        isTimerRunning={isTimerRunning}
      />
      <TaskPanel
        show={isTaskPanelShowing}
        handleClose={() => setIsTaskPanelShowing(false)}
        className="task-panel"
      />
    </Stack>
  );
}

export default App;
