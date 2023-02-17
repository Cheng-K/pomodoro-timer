import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
function DeleteButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <MdDelete size="2rem" className="icon-black" />
    </Button>
  );
}

export default DeleteButton;
