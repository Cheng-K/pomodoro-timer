import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import onFinishRingtoneUrl from "./assets/onFinish-ringtone.mp3";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskPanel from "./components/TaskPanel";
import Timer from "./components/Timer";
import TimerControlButtons from "./components/TimerControlButtons";
import SettingsModal from "./components/SettingsModal";
import useInterval from "./hooks/useInterval";
import { useLiveQuery } from "dexie-react-hooks";
import * as Storage from "./utilities/database.js";

function App() {
  const maxSession = useLiveQuery(() =>
    Storage.getSetting(Storage.settingsKey.maxSession).then(
      (value) => value * 2
    )
  );
  const workSeconds = useLiveQuery(() =>
    Storage.getSetting(Storage.settingsKey.workDuration)
  );
  const shortRestSeconds = useLiveQuery(() =>
    Storage.getSetting(Storage.settingsKey.shortRestDuration)
  );
  const longRestSeconds = useLiveQuery(() =>
    Storage.getSetting(Storage.settingsKey.longRestDuration)
  );
  const [prevSettings, setPrevSettings] = useState({});
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [prevSessionNumber, setPrevSessionNumber] = useState(1);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [currentSeconds, setCurrentSeconds] = useState(undefined);
  const [isTaskPanelShowing, setIsTaskPanelShowing] = useState(false);
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);

  const runAfterOneSecond = () => setCurrentSeconds(currentSeconds - 1);
  useInterval(runAfterOneSecond, isTimerRunning ? 1000 : null);

  const setClock = (time) => setCurrentSeconds(time);
  const setClockBasedOnSession = () => {
    if (sessionNumber % 2 == 0 && sessionNumber === maxSession) {
      setClock(longRestSeconds);
    } else if (sessionNumber % 2 == 0) {
      setClock(shortRestSeconds);
    } else {
      setClock(workSeconds);
    }
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

  if (!maxSession || !workSeconds || !shortRestSeconds || !longRestSeconds)
    return <></>;

  if (
    prevSettings[Storage.settingsKey.workDuration] !== workSeconds ||
    prevSettings[Storage.settingsKey.shortRestDuration] !== shortRestSeconds ||
    prevSettings[Storage.settingsKey.longRestDuration] !== longRestSeconds
  ) {
    const newSettings = {};
    newSettings[Storage.settingsKey.workDuration] = workSeconds;
    newSettings[Storage.settingsKey.shortRestDuration] = shortRestSeconds;
    newSettings[Storage.settingsKey.longRestDuration] = longRestSeconds;
    setPrevSettings(newSettings);
    setClockBasedOnSession();
  }

  if (maxSession < Math.ceil(sessionNumber / 2)) {
    setSessionNumber(1);
  }

  if (sessionNumber !== prevSessionNumber) {
    setClockBasedOnSession();
    setPrevSessionNumber(sessionNumber);
  }

  return (
    <Stack className="py-3 vw-100 vh-100">
      <Header
        isWorkingSession={sessionNumber % 2 !== 0}
        taskButtonOnClick={() => setIsTaskPanelShowing(true)}
        settingsButtonOnClick={() => setIsSettingsShowing(true)}
        isTimerRunning={isTimerRunning}
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
          setClockBasedOnSession();
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
      <SettingsModal
        show={isSettingsShowing}
        handleClose={() => setIsSettingsShowing(false)}
        onUpdate={async (newSettings) => {
          await Storage.updateSettings(newSettings);
        }}
        currentWorkSeconds={workSeconds}
        currentShortRestSeconds={shortRestSeconds}
        currentLongRestSeconds={longRestSeconds}
        currentMaxSession={maxSession}
      />
    </Stack>
  );
}

export default App;
