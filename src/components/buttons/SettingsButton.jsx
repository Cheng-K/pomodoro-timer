import { Button } from "react-bootstrap";
import { MdSettings } from "react-icons/md";
function SettingsButton({ onClick, className = "", iconStyle = "", ...props }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
      {...props}
    >
      <MdSettings className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default SettingsButton;
