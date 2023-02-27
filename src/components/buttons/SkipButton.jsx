import Button from "react-bootstrap/Button";
import React from "react";
import { MdSkipNext } from "react-icons/md";

function SkipButton({ className = "", onClick, ...props }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
      {...props}
    >
      <MdSkipNext className="icon" />
    </Button>
  );
}

export default SkipButton;
