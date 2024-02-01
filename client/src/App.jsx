import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar, AppRoutes } from "./components";

function App() {
  return (
    <Router>
      <NavBar />
      <AppRoutes />
    </Router>
  );
}

export default App;
