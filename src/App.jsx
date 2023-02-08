import "./styles/App.scss";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import Timer from "./components/Timer";
import ControlButton from "./components/controls/ControlButtons";
import Footer from "./components/Footer";

function App() {
  return (
    <Stack className="vw-100 vh-100 bg-primary">
      <Header />
      <Timer />
      <ControlButton />
      <Footer />
    </Stack>
  );
}

export default App;
