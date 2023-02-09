import { Button } from "react-bootstrap";
import { MdSettings } from "react-icons/md";
function SettingsButton({ className = "", iconStyle = "" }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
    >
      <MdSettings className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default SettingsButton;
