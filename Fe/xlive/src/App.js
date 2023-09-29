import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/home";
import CreateOverlays from "./components/createOverlay";
import AllOverlays from "./components/allOverlays";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home/>} />
          <Route exact path="overlays/new" element={<CreateOverlays />} />
          <Route exact path="overlays" element={<AllOverlays />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;