import { useState } from "react";
import mokkaSoftLogo from "./../assets/coffee-icon.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Trabajadores from './dashboard/Employees';
import Reportes from './dashboard/Reports';
import Ventas from './dashboard/Sales';
import Inventario from './dashboard/Inventory'
import UserHome from "./user/UserHome";

// import "./tailwind.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>MokkaSoft</h1>
              <h1>Dashboard</h1>
              <Link to="/dashboard">Go to Dashboard</Link>
              <h1>User</h1>
              <Link to="/userhome">Go to userhome</Link>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trabajadores" element={<Trabajadores />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
