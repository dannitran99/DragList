import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DragList from "./pages/DragList";
import { RouteType } from "./constants/route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RouteType.dragList} element={<DragList />} />
      </Routes>
    </Router>
  );
}

export default App;
