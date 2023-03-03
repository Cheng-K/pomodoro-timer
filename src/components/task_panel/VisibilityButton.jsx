import Button from "react-bootstrap/Button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function VisibilityButton({ onClick, offVariant = false, ...props }) {
  return (
    <AppTooltip
      text={offVariant ? "Hide All Completed Task" : "Show All Completed Task"}
    >
      <Button onClick={onClick} variant="secondary" {...props}>
        {offVariant ? (
          <MdVisibilityOff size="32px" className="icon-black" />
        ) : (
          <MdVisibility size="32px" className="icon-black" />
        )}
      </Button>
    </AppTooltip>
  );
}

export default VisibilityButton;
