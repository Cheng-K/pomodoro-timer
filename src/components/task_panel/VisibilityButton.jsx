import Button from "react-bootstrap/Button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function VisibilityButton({ onClick, offVariant = false }) {
  return (
    <AppTooltip
      text={offVariant ? "Hide All Completed Task" : "Show All Completed Task"}
    >
      <Button onClick={onClick} variant="secondary">
        {offVariant ? (
          <MdVisibilityOff size="2rem" className="icon-black" />
        ) : (
          <MdVisibility size="2rem" className="icon-black" />
        )}
      </Button>
    </AppTooltip>
  );
}

export default VisibilityButton;
