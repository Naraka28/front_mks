import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Trabajadores from './dashboard/Employees';
import Reportes from './dashboard/Reports';
import Ventas from './dashboard/Sales';
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
import CreateFlavourRegister from "./dashboard/createRegisters/CreateFlavourRegister";
import CreateSizeRegister from "./dashboard/createRegisters/CreateSizesRegister";
import CreateMilkRegister from "./dashboard/createRegisters/CreateMilkRegister";
import CreateToppingRegister from "./dashboard/createRegisters/CreateToppingsRegister";
import CreateCatRegister from "./dashboard/createRegisters/CreateCatRegister";
import { OrderProvider } from './user/auxiliaryComponents/OrderContext';
import Login from "./Login";
import CashierLayout from "./cashier/CashierLayout";


function App() {

  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login />
            
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

          <Route path="/productos/agregar-producto" element={<CreateProductRegister />} />
          <Route path="/sabores/agregar-sabor" element={<CreateFlavourRegister />} />
          <Route path="/tamanos/agregar-tamano" element={<CreateSizeRegister />} />
          <Route path="/leches/agregar-leche" element={<CreateMilkRegister />} />
          <Route path="/toppings/agregar-topping" element={<CreateToppingRegister />} />

          <Route path="/dashboard/add-item-cat" element={<CreateCatRegister />} />

          <Route path="/productos/editar-producto/:id" element={<CreateProductRegister />} />
          <Route path="/sabores/editar-sabor/:id" element={<CreateFlavourRegister />} />
          <Route path="/tamanos/editar-tamano/:id" element={<CreateSizeRegister />} />
          <Route path="/leches/editar-leche/:id" element={<CreateMilkRegister />} />
          <Route path="/toppings/editar-topping/:id" element={<CreateToppingRegister />} />

          <Route path="/userhome" element={<UserHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:itemId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId/size/:sizeId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId/size/:sizeId/flavour/:flavourId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId/size/:sizeId/flavour/:flavourId/coffeeBeans/:coffeeBeansId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId/size/:sizeId/flavour/:flavourId/coffeeBeans/:coffeeBeansId/milk/:milkId" element={<MenuSelected />} />
          <Route path="/menu/:itemId/temp/:tempId/size/:sizeId/flavour/:flavourId/coffeeBeans/:coffeeBeansId/milk/:milkId/topping/:toppingId" element={<MenuSelected />} />
          <Route path="/order-actions" element={<MenuSelected />} />
          <Route path="/order/confirm" element={< OrderConfirmation />} />

          <Route path="/cashier/*" element={<CashierLayout />} />

        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
