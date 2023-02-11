import { Button } from "react-bootstrap";
import { MdSettings } from "react-icons/md";
function SettingsButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
    >
      <MdSettings className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default SettingsButton;
