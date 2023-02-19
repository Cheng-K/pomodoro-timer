import Button from "react-bootstrap/Button";
import { MdEdit, MdEditOff } from "react-icons/md";
function EditButton({ onClick, offVariant = false }) {
  return (
    <Button onClick={onClick} variant="secondary">
      {offVariant ? (
        <MdEditOff size="2rem" className="icon-black" />
      ) : (
        <MdEdit size="2rem" className="icon-black" />
      )}
    </Button>
  );
}

export default EditButton;
