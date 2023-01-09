import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DragList from "./pages/DragList";
import { RouteType } from "./constants/route";
import TableScheduler from "./pages/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RouteType.dragList} element={<DragList />} />
        <Route path={RouteType.table} element={<TableScheduler />} />
      </Routes>
    </Router>
  );
}

export default App;
