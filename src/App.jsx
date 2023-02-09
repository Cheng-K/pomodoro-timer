import "./styles/App.scss";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TimerControlButtons from "./components/TimerControlButtons";
import Footer from "./components/Footer";

function App() {
  return (
    <Stack className="py-3 vw-100 vh-100">
      <Header />
      <Timer />
      <TimerControlButtons />
      <Footer />
    </Stack>
  );
}

export default App;
