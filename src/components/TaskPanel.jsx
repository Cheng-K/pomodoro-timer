import dayjs from "dayjs";
import React, { useReducer, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddTaskModal from "./AddTaskModal";
import AddButton from "./task_panel/AddButton";
import CloseButton from "./task_panel/CloseButton";
import DeleteAllButton from "./task_panel/DeleteAllButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";

function TaskPanel({ show, handleClose, ...props }) {
  const [inEditMode, setInEditMode] = useState(false);
  const [tasksList, updateTaskList] = useReducer(
    (task, request) => {
      if (request.type === "POST") {
        return [...task, request.task];
      } else if (request.type === "PUT") {
        return task.map((t) => {
          if (t.id === request.task.id) {
            return request.task;
          }
          return t;
        });
      } else if (request.type === "DELETE") {
        return task.filter((t) => {
          t.id !== request.task.id;
        });
      }
    },
    [{ id: 1, title: "Programming", dueDateTime: dayjs() }]
  );
  const [addModalShowing, setAddModalShowing] = useState(false);
  const allTasks = tasksList.map((task) => {
    let dueDate = task.dueDateTime.format("YYYY-MM-DD");
    let dueTime = task.dueDateTime.format("HH:mm");
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
        className="mb-3"
        onUpdate={(updatedTask) =>
          updateTaskList({ type: "PUT", task: updatedTask })
        }
      />
    );
  });
  console.log(tasksList);
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
                />
              </>
            )}
            <CloseButton className="me-1" onClick={handleClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>{allTasks}</Offcanvas.Body>
      </Offcanvas>
      <AddTaskModal
        show={addModalShowing}
        handleClose={() => setAddModalShowing(false)}
        onAdd={(newTask) => updateTaskList({ type: "POST", task: newTask })}
      />
    </>
  );
}

export default TaskPanel;
