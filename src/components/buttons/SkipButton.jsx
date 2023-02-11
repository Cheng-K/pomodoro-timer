import Button from "react-bootstrap/Button";
import React from "react";
import { MdSkipNext } from "react-icons/md";

function SkipButton({ className = "", onClick }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
    >
      <MdSkipNext className="icon" />
    </Button>
  );
}

export default SkipButton;
