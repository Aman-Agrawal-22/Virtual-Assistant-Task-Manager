import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TodosPage from "./pages/TodosPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="mt-5"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todopage" element={<TodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
