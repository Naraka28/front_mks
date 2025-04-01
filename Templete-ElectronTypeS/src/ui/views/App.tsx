import { useState } from "react";
import mokkaSoftLogo from "./../assets/coffee-icon.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Trabajadores from './dashboard/Employees';
import Reportes from './dashboard/Reports';
import Ventas from './dashboard/Sales';
import Inventario from './dashboard/Inventory'
import UserHome from "./user/UserHome";
import Menu from "./user/Menu";
import MenuSelected from "./user/MenuSelected";
import OrderConfirmation from "./user/OrderConfirmation";
import Sizes from "./dashboard/Sizes";
import Milks from "./dashboard/Milks";
import Toppings from "./dashboard/Toppings";
import Flavours from "./dashboard/Flavours";
import Products from "./dashboard/Products";
import CreateProductRegister from "./dashboard/createRegisters/CreateProductRegister";
import CreateCatRegister from "./dashboard/createRegisters/CreateCatRegister";


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
        <Route path="/sabores" element={<Flavours />} />
        <Route path="/tamanos" element={<Sizes />} />
        <Route path="/leches" element={<Milks />} />
        <Route path="/toppings" element={<Toppings />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/inventario" element={<Inventario />} />

        <Route path="/dashboard/add-item-products" element={<CreateProductRegister />} />
        <Route path="/dashboard/add-item-cat" element={<CreateCatRegister />} />

        <Route path="/userhome" element={<UserHome />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/selected/:itemId" element={<MenuSelected />} />
        <Route path="/menu/:itemId" element={<MenuSelected />} />
        <Route path="/menu/:itemId/size/:sizeId" element={<MenuSelected />} />
        <Route path="/menu/:itemId/size/:sizeId/flavour/:flavourId" element={<MenuSelected />} />
        <Route path="/menu/:itemId/size/:sizeId/flavour/:flavourId/coffeeBeans/:coffeeBeansId" element={<MenuSelected />} />
        <Route path="/menu/:itemId/size/:sizeId/flavour/:flavourId/coffeeBeans/:coffeeBeansId/toppings/:toppingId" element={<MenuSelected />} />
        <Route path="/order-actions" element={<MenuSelected />} />
        <Route path="/order/confirm" element={< OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
