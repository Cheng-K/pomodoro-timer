import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
function DeleteAllButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <MdDeleteForever size="2rem" className="icon-black" />
    </Button>
  );
}

export default DeleteAllButton;
