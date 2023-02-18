import React, { useReducer, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddTaskModal from "./AddTaskModal";
import AddButton from "./task_panel/AddButton";
import BackButton from "./task_panel/BackButton";
import CloseButton from "./task_panel/CloseButton";
import DeleteAllButton from "./task_panel/DeleteAllButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";

function TaskPanel({ show, handleClose, ...props }) {
  const [isEditing, toggleEditing] = useReducer(
    (currentState) => !currentState,
    false
  );
  const [tasksList, setTasksList] = useState([]);
  const [addModalShowing, setAddModalShowing] = useState(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header>
          <Offcanvas.Title>Tasks</Offcanvas.Title>
          <div>
            {isEditing ? (
              <>
                <BackButton onClick={toggleEditing} />
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
          <Task editMode={isEditing} />
        </Offcanvas.Body>
      </Offcanvas>
      <AddTaskModal
        show={addModalShowing}
        handleClose={() => setAddModalShowing(false)}
      />
    </>
  );
}

export default TaskPanel;
