import Dexie from "dexie";
import dayjs from "dayjs";

export const db = new Dexie("PomodoroDatabase");
export const settingsKey = {
  workDuration: "WORKSECONDS",
  shortRestDuration: "SHORTRESTSECONDS",
  longRestDuration: "LONGRESTSECONDS",
  maxSession: "MAXSESSION",
};

db.version(1).stores({
  tasks: "++id, title, dueDateTime",
  settings: "name, value",
});

db.on("populate", (tx) => {
  tx.table("settings").bulkAdd([
    { name: settingsKey.workDuration, value: 25 * 60 },
    { name: settingsKey.shortRestDuration, value: 5 * 60 },
    { name: settingsKey.longRestDuration, value: 15 * 60 },
    { name: settingsKey.maxSession, value: 4 },
  ]);
});

export async function addTask(newTask) {
  return db.tasks.add(newTask);
}

export async function updateTask(newTask) {
  return db.tasks.put(newTask);
}

export async function removeTask(taskId) {
  return db.tasks.delete(taskId);
}

export function getAllTask() {
  return db.tasks.toArray();
}

export async function getAllNotDoneTask() {
  return db.tasks
    .filter((t) => !t.done)
    .toArray()
    .then((array) => {
      return array.sort((taskA, taskB) => {
        const datetimeA = dayjs(taskA.dueDateTime);
        const datetimeB = dayjs(taskB.dueDateTime);
        if (!datetimeA.isValid() && !datetimeB.isValid())
          return 1 ? taskA.title > taskB.title : -1;
        else if (!datetimeA.isValid()) return 1;
        else if (!datetimeB.isValid()) return -1;
        else if (datetimeA.isBefore(datetimeB, "minute")) return -1;
        else if (datetimeA.isAfter(datetimeB, "minute")) {
          return 1;
        } else
          return 1
            ? taskA.title > taskB.title
            : -1
            ? taskA.title < taskB.title
            : 0;
      });
    });
}

export async function getAllDoneTask() {
  return db.tasks
    .filter((t) => t.done)
    .toArray()
    .then((array) => {
      return array.sort((taskA, taskB) => {
        const datetimeA = dayjs(taskA.dueDateTime);
        const datetimeB = dayjs(taskB.dueDateTime);
        if (!datetimeA.isValid() && !datetimeB.isValid())
          return 1 ? taskA.title > taskB.title : -1;
        else if (!datetimeA.isValid()) return 1;
        else if (!datetimeB.isValid()) return -1;
        else if (datetimeA.isBefore(datetimeB, "minute")) return 1;
        else if (datetimeA.isAfter(datetimeB, "minute")) {
          return -1;
        } else
          return 1
            ? taskA.title > taskB.title
            : -1
            ? taskA.title < taskB.title
            : 0;
      });
    });
}

export function createTaskForUpdate(id, title, dateObj, done, displayTime) {
  return { id, title, dueDateTime: dateObj, done, displayTime };
}

export function createTaskForAdd(title, dateObj, displayTime) {
  return { title, dueDateTime: dateObj, done: false, displayTime };
}

export async function bulkDeleteTasks(arr) {
  return db.tasks.bulkDelete(arr);
}

export function reduceToPrimaryKey(tasks) {
  return tasks.map((t) => t.id);
}

export async function updateSettings(newSettings) {
  return db.settings.bulkPut(newSettings);
}

export async function getSetting(key) {
  return db.settings.get(key).then((obj) => obj.value);
}
