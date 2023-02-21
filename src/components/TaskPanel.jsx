import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import * as Storage from "../utilities/database";
import AddTaskModal from "./AddTaskModal";
import AddButton from "./task_panel/AddButton";
import CloseButton from "./task_panel/CloseButton";
import DeleteAllButton from "./task_panel/DeleteAllButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";
import VisibilityButton from "./task_panel/VisibilityButton";

function TaskPanel({ show, handleClose, ...props }) {
  const [inEditMode, setInEditMode] = useState(false);
  const [addModalShowing, setAddModalShowing] = useState(false);
  const [isShowingFinishedTasks, setIsShowingFinishedTasks] = useState(false);
  const notDoneTasks = useLiveQuery(Storage.getAllNotDoneTask);
  const doneTasks = useLiveQuery(Storage.getAllDoneTask);
  const pendingTasksList = notDoneTasks?.map((task) => {
    let dueDate = dayjs(task.dueDateTime).format("YYYY-MM-DD");
    let dueTime = task.displayTime
      ? dayjs(task.dueDateTime).format("HH:mm")
      : "";
    if (dueDate === "Invalid Date") dueDate = "";
    if (dueTime === "Invalid Date") dueTime = "";
    return (
      <Task
        key={task.id}
        id={task.id}
        editMode={inEditMode}
        defaultTitle={task.title}
        dueDate={dueDate}
        dueTime={dueTime}
        done={task.done}
        className="mb-3"
        onUpdate={async (updatedTask) => await Storage.updateTask(updatedTask)}
        onDelete={async (taskId) => await Storage.removeTask(taskId)}
      />
    );
  });
  let doneTasksList = null;
  if (isShowingFinishedTasks) {
    doneTasksList = doneTasks?.map((task) => {
      let dueDate = dayjs(task.dueDateTime).format("YYYY-MM-DD");
      let dueTime = task.displayTime
        ? dayjs(task.dueDateTime).format("HH:mm")
        : "";
      if (dueDate === "Invalid Date") dueDate = "";
      if (dueTime === "Invalid Date") dueTime = "";
      return (
        <Task
          key={task.id}
          id={task.id}
          editMode={inEditMode}
          defaultTitle={task.title}
          dueDate={dueDate}
          dueTime={dueTime}
          done={task.done}
          className="mb-3"
          onUpdate={async (updatedTask) =>
            await Storage.updateTask(updatedTask)
          }
          onDelete={async (taskId) => await Storage.removeTask(taskId)}
        />
      );
    });
  }

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        onExited={() => setInEditMode(false)}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            {inEditMode ? "Edit Tasks" : "Tasks"}
          </Offcanvas.Title>
          <div>
            {inEditMode ? (
              <>
                <EditButton onClick={() => setInEditMode(false)} offVariant />
                <DeleteAllButton className="me-3" />
              </>
            ) : (
              <>
                <AddButton onClick={() => setAddModalShowing(true)} />
                <EditButton
                  className="me-3"
                  onClick={() => setInEditMode(true)}
                  tooltip="Edit Tasks"
                />
              </>
            )}
            <VisibilityButton
              offVariant={isShowingFinishedTasks}
              onClick={() => setIsShowingFinishedTasks((current) => !current)}
            />
            <CloseButton className="me-1" onClick={handleClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {pendingTasksList}
          {isShowingFinishedTasks && (
            <hr className="border border-light-black border-1 opacity-25" />
          )}
          {doneTasksList}
        </Offcanvas.Body>
      </Offcanvas>
      <AddTaskModal
        show={addModalShowing}
        handleClose={() => setAddModalShowing(false)}
        onAdd={async (newTask) => await Storage.addTask(newTask)}
      />
    </>
  );
}

export default TaskPanel;
