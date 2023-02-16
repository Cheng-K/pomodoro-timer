import { openDB, deleteDB, wrap, unwrap } from "idb";

// Schema :
// Key
// Title
// Done
// Due datetime

async function openDatabase(name) {
  return openDB(name);
}

async function initDatabase() {
  return openDB("master-db", 1, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      db.createObjectStore("tasks", { autoIncrement: true });
      db.createObjectStore("keyval-settings");
      transaction
        .objectStore("tasks")
        .createIndex("due", "due", { unique: false });
    },
  });
}

async function insertTask(db, task) {
  const tx = db.transaction("tasks", "readwrite");
  const taskStore = tx.objectStore("tasks");
  await taskStore.add(task);
  return tx.done;
}

async function updateTask(db, newTask, key) {
  const tx = db.transaction("tasks", "readwrite");
  const taskStore = tx.objectStore("tasks");
  await taskStore.put(newTask, key);
  return tx.done;
}

async function getTask(db, key) {
  const tx = db.transaction("tasks", "readonly");
  const taskStore = tx.objectStore("tasks");
  const result = await taskStore.get(key);
  await tx.done;
  return result;
}

async function getAllTask(db) {
  const tx = db.transaction("tasks", "readonly");
  const taskStore = tx.objectStore("tasks");
  const result = await taskStore.getAll();
  await tx.done;
  return result;
}

export { openDatabase, initDatabase };
