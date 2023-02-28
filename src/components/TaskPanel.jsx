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
  const [activeTaskId, setActiveTaskId] = useState(undefined);
  const notDoneTasks = useLiveQuery(Storage.getAllNotDoneTask);
  const doneTasks = useLiveQuery(Storage.getAllDoneTask);
  const pendingTasksList = notDoneTasks?.map((task) => {
    let datetime = dayjs(task.dueDateTime);
    let dueDate = datetime.isValid() ? datetime.format("YYYY-MM-DD") : "";
    let dueTime =
      datetime.isValid() && task.displayTime ? datetime.format("HH:mm") : "";
    let expired = false;
    if (datetime.isValid() && task.displayTime)
      expired = datetime.isBefore(dayjs(), "minutes");
    else if (datetime.isValid()) expired = datetime.isBefore(dayjs(), "day");
    if (task.active === 1 && activeTaskId === undefined)
      setActiveTaskId(task.id);
    return (
      <Task
        key={task.id}
        id={task.id}
        active={activeTaskId === task.id}
        editMode={inEditMode}
        defaultTitle={task.title}
        dueDate={dueDate}
        dueTime={dueTime}
        done={task.done}
        className="mb-3 py-1"
        onUpdate={async (updatedTask) => await Storage.updateTask(updatedTask)}
        onDelete={async (taskId) => await Storage.removeTask(taskId)}
        onActivate={async (newId) => {
          setActiveTaskId(newId);
          await Storage.changeActiveTask(activeTaskId, newId);
        }}
        onDeactivate={async () => {
          setActiveTaskId(null);
          Storage.deactivateTask(task.id);
        }}
        expired={expired}
      />
    );
  });
  let doneTasksList = null;
  if (isShowingFinishedTasks) {
    doneTasksList = doneTasks?.map((task) => {
      let datetime = dayjs(task.dueDateTime);
      let dueDate = datetime.isValid() ? datetime.format("YYYY-MM-DD") : "";
      let dueTime =
        datetime.isValid() && task.displayTime ? datetime.format("HH:mm") : "";
      return (
        <Task
          key={task.id}
          id={task.id}
          editMode={inEditMode}
          defaultTitle={task.title}
          dueDate={dueDate}
          dueTime={dueTime}
          done={task.done}
          active={false}
          className="mb-3 py-1"
          onUpdate={async (updatedTask) =>
            await Storage.updateTask(updatedTask)
          }
          onDelete={async (taskId) => await Storage.removeTask(taskId)}
          expired={false}
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
        data-cy="task-panel-container"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            {inEditMode ? "Edit Tasks" : "Tasks"}
          </Offcanvas.Title>
          <div>
            {inEditMode ? (
              <>
                <EditButton
                  onClick={() => setInEditMode(false)}
                  offVariant
                  data-cy="task-panel-edit-btn"
                />
                <DeleteAllButton
                  data-cy="task-panel-delete-all-btn"
                  onClick={() => {
                    let array1 = Storage.reduceToPrimaryKey(notDoneTasks);
                    let array2 = null;
                    if (isShowingFinishedTasks)
                      array2 = Storage.reduceToPrimaryKey(doneTasks);
                    Storage.db
                      .transaction("rw", Storage.db.tasks, () => {
                        if (isShowingFinishedTasks)
                          return Promise.all([
                            Storage.bulkDeleteTasks(array1),
                            Storage.bulkDeleteTasks(array2),
                          ]);
                        return Storage.bulkDeleteTasks(array1);
                      })
                      .then(() => {
                        console.log("Delete successful");
                      })
                      .catch((error) => console.log(error));
                  }}
                />
              </>
            ) : (
              <>
                <AddButton
                  onClick={() => setAddModalShowing(true)}
                  data-cy="task-panel-add-btn"
                />
                <EditButton
                  data-cy="task-panel-edit-btn"
                  onClick={() => setInEditMode(true)}
                  tooltip="Edit Tasks"
                />
              </>
            )}
            <VisibilityButton
              offVariant={isShowingFinishedTasks}
              onClick={() => setIsShowingFinishedTasks((current) => !current)}
              data-cy="task-panel-visibility-btn"
            />
            <CloseButton
              className="me-1"
              onClick={handleClose}
              data-cy="task-panel-close-btn"
            />
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
