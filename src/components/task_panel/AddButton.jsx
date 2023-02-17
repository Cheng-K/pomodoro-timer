import { Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
function AddButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <MdAdd size="2rem" className="icon-black" />
    </Button>
  );
}

export default AddButton;
