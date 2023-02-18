import React, { useReducer, useState, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddTaskModal from "./AddTaskModal";
import AddButton from "./task_panel/AddButton";
import BackButton from "./task_panel/BackButton";
import CloseButton from "./task_panel/CloseButton";
import DeleteAllButton from "./task_panel/DeleteAllButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TaskPanel({ show, handleClose, ...props }) {
  const [isEditing, toggleEditing] = useReducer(
    (currentState) => !currentState,
    false
  );
  const [tasksList, setTasksList] = useState([
    { key: 1, title: "Programming", dueDateTime: dayjs() },
  ]);
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
            <Offcanvas.Title>Tasks</Offcanvas.Title>
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
                editMode={isEditing}
                defaultTitle={task.title}
                due={task.dueDateTime}
                className="mb-3"
              />
            ))}
          </Offcanvas.Body>
        </Form>
      </Offcanvas>
      <AddTaskModal
        show={addModalShowing}
        handleClose={() => setAddModalShowing(false)}
        onAdd={(newTask) =>
          setTasksList((currentTaskList) => [...currentTaskList, newTask])
        }
      />
    </>
  );
}

export default TaskPanel;
