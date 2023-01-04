import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DragList from "./pages/DragList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DragList />} />
      </Routes>
    </Router>
  );
}

export default App;
