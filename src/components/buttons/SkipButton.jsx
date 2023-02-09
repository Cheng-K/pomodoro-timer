import Button from "react-bootstrap/Button";
import React from "react";
import { MdSkipNext } from "react-icons/md";

function SkipButton({ className = "" }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button d-flex justify-content-center align-items-center ${className}`}
    >
      <MdSkipNext className="icon" />
    </Button>
  );
}

export default SkipButton;
