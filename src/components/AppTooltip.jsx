import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function AppTooltip(props) {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      trigger={["hover"]}
      overlay={<Tooltip>{props.text}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
}

export default AppTooltip;
