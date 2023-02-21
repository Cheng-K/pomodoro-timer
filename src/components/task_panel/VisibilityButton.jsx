import Button from "react-bootstrap/Button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
function VisibilityButton({ onClick, offVariant = false }) {
  return (
    <Button onClick={onClick} variant="secondary">
      {offVariant ? (
        <MdVisibilityOff size="2rem" className="icon-black" />
      ) : (
        <MdVisibility size="2rem" className="icon-black" />
      )}
    </Button>
  );
}

export default VisibilityButton;
