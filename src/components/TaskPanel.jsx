import dayjs from "dayjs";
import React, { useReducer, useState } from "react";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddTaskModal from "./AddTaskModal";
import AddButton from "./task_panel/AddButton";
import CloseButton from "./task_panel/CloseButton";
import DeleteAllButton from "./task_panel/DeleteAllButton";
import BackButton from "./task_panel/DoneButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";

function TaskPanel({ show, handleClose, ...props }) {
  const [isEditing, toggleEditing] = useReducer(
    (currentState) => !currentState,
    false
  );
  const [tasksList, updateTaskList] = useReducer(
    (task, request) => {
      if (request.type === "POST") {
        return [...task, request.task];
      } else if (request.type === "PUT") {
        return task.map((t) => {
          if (t.key === request.task.key) {
            return request.task;
          }
          return t;
        });
      } else if (request.type === "DELETE") {
        return task.filter((t) => {
          t.key !== request.task.key;
        });
      }
    },
    [{ key: 1, title: "Programming", dueDateTime: dayjs() }]
  );
  const [addModalShowing, setAddModalShowing] = useState(false);
  const [editValidated, setEditValidated] = useState(false);
  const onEditFinish = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setEditValidated(true);
    if (form.checkValidity() !== false) {
      setEditValidated(false);
      toggleEditing();
    }
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Form noValidate validated={editValidated} onSubmit={onEditFinish}>
          <Offcanvas.Header>
            <Offcanvas.Title>
              {isEditing ? "Edit Tasks" : "Tasks"}
            </Offcanvas.Title>
            <div>
              {isEditing ? (
                <>
                  <BackButton type="submit" />
                  <DeleteAllButton className="me-3" />
                </>
              ) : (
                <>
                  <AddButton onClick={() => setAddModalShowing(true)} />
                  <EditButton className="me-3" onClick={toggleEditing} />
                </>
              )}
              <CloseButton className="me-1" onClick={handleClose} />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {tasksList.map((task) => (
              <Task
                key={task.key}
                editMode={isEditing}
                defaultTitle={task.title}
                due={task.dueDateTime}
                className="mb-3"
                onUpdate={(updatedTask) =>
                  updateTaskList({ type: "PUT", task: updatedTask })
                }
              />
            ))}
          </Offcanvas.Body>
        </Form>
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
