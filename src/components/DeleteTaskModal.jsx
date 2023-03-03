import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function DeleteTaskModal({
  deleteTarget,
  onDelete,
  show,
  handleClose,
  ...props
}) {
  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      contentClassName="modal-bg"
      data-cy={props["data-cy"]}
    >
      <Modal.Header closeButton>
        <h5 className="mb-0" data-cy={props["data-cy"] + "-title-label"}>
          Delete Confirmation
        </h5>
      </Modal.Header>
      <Modal.Body>
        <p data-cy={props["data-cy"] + "-content-label"}>
          Are you sure to delete <strong>{deleteTarget}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="white"
          onClick={handleClose}
          data-cy={props["data-cy"] + "-no-btn"}
        >
          <span className="fw-light">No</span>
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await onDelete();
            handleClose();
          }}
        >
          <span
            className="white-text fw-semibold"
            data-cy={props["data-cy"] + "-yes-btn"}
          >
            Yes
          </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTaskModal;
