import Dexie from "dexie";
import dayjs from "dayjs";

export const db = new Dexie("PomodoroDatabase");

db.version(1).stores({
  tasks: "++id, title, dueDateTime",
  settings: "name, value",
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
