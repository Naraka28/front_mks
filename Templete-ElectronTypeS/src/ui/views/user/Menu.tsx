// Menu.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./auxiliaryComponents/Sidebar";
import MenuItems from "../user/Components/MenuItems";
import OrderCard from "./auxiliaryComponents/OrderCard";
import { useOrders } from "./auxiliaryComponents/OrderContext";
import Button from "./auxiliaryComponents/Button";

function Menu() {
  const [selectedType, setselectedType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { orders } = useOrders(); // Obtén las órdenes del contexto

  const handleSelectItem = (id: number) => {
    navigate(`/selected/${id}`);
  };

  const handleSendOrder = () => {
    navigate("/order/confirm");
  };

  return (
    <div className="h-screen w-screen manrope-500 bg-[#F7F2F2]">
      <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

      <div className="relative grid grid-cols-9 grid-rows-8 gap-3 p-5 min-h-screen">
        {/* Sidebar */}
        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 flex">
          <Sidebar onSelectCategory={setselectedType} />
        </div>

        {/* Contenido */}
        <div className="col-span-6 rounded-2xl flex justify-start items-center text-5xl font-[Poppins] font-extrabold p-4">
          <h1>
            {selectedType ? `Categoría: ${selectedType}` : "¿Qué se te antoja hoy?"}
          </h1>
        </div>

        {/* Nueva Orden */}
        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 col-span-2 flex flex-col p-4 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 font-[poppins]">Tu Pedido</h2>
          <div className="space-y-3 font-bold font-[poppins]">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))
            ) : (
                <p className="text-xl font-bold text-gray-500">No hay productos añadidos</p>
            )}
          </div>
          {orders.length > 0 && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex justify-between font-bold text-2xl font-[poppins]">
                <span className="">Total:</span>
                <span>
                  ${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-center mt-6">
                <Button
                  texto="Terminar orden"
                  onClick={handleSendOrder}
                />
              </div>
            </div>
          )}
        </div>

        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-7 col-span-6 overflow-y-auto p-4 scrollbar-hide" style={{ maxHeight: 'calc(106vh - 200px)' }}>
          <MenuItems category={selectedType} onSelectItem={handleSelectItem} />
        </div>
      </div>
    </div>
  );
}

export default Menu;