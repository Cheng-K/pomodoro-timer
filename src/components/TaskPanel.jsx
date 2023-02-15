import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "./task_panel/CloseButton";
import EditButton from "./task_panel/EditButton";
import Task from "./task_panel/Task";

function TaskPanel({ show, handleClose, ...props }) {
  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header>
        <Offcanvas.Title>Tasks</Offcanvas.Title>
        <div>
          <EditButton className="me-3" />
          <CloseButton className="me-1" onClick={handleClose} />
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Task />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default TaskPanel;
