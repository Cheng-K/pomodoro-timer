import { Button } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
function EditButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <MdEdit size="2rem" className="icon-black" />
    </Button>
  );
}

export default EditButton;
