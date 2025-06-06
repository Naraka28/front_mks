// Menu.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./auxiliaryComponents/Sidebar";
import MenuItems from "../user/Components/MenuItems";
import OrderCard from "./auxiliaryComponents/OrderCard";
import { useOrders } from "./auxiliaryComponents/OrderContext";
import Button from "./auxiliaryComponents/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/productsServices";
import { getToppings } from "../../services/toppingsServices";
import { getMilks } from "../../services/milksServices";
import { getFlavors } from "../../services/flavorServices";
import { getSizes } from "../../services/sizeServices";
import { calculateTotal } from "./auxiliaryComponents/orderUtils";
import { createOrderWithTicket } from "../../services/ordersServices";

function Menu() {
  const [selectedType, setselectedType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { orders, clearOrders } = useOrders();
  
  const queryClient = useQueryClient();
  const handleSelectProduct = (id: number) => {
    navigate(`/menu/${id}`);
  };

  const handleSendOrder = async () => {
    try {
      const response = await createOrderWithTicket(orders);
      const total = orders.reduce(
        (sum, order) =>
          sum +
          calculateTotal(
            {
              itemId: order.productId,
              milkId: order.milk,
              sizeId: order.size,
              flavourId: order.flavour,
              toppings: Object.fromEntries(
                (order.toppings || []).map(ot => [ot.id, ot.quantity])
              ),
            },
            menuItems,
            toppingOptions,
            milksOptions,
            flavourOptions,
            sizeItems
          ).total,
        0
      );
      // Guarda el flag
      localStorage.setItem("orderConfirmed", "true");
      navigate("/order/confirm", {
        state: {
          orderNumber: response.id,
          total: total.toFixed(2),
        },
      });
      clearOrders();
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    } catch (e: any) {
      alert("Error al enviar la orden");
    }
  };

  const handleCancelOrder = () => {
    clearOrders();
    navigate("/userhome");
  };

  const { data: menuItems = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const { data: toppingOptions = [] } = useQuery({ queryKey: ["toppings"], queryFn: getToppings });
  const { data: milksOptions = [] } = useQuery({ queryKey: ["milks"], queryFn: getMilks });
  const { data: flavourOptions = [] } = useQuery({ queryKey: ["flavors"], queryFn: getFlavors });
  const { data: sizeItems = [] } = useQuery({ queryKey: ["sizes"], queryFn: getSizes });

  // Agrega el console.log para order.toppings
  orders.forEach(orders => {
    console.log("order.toppings:", orders.toppings);
  });
  return (
    <div className="h-screen w-screen manrope-500 bg-gradient-to-b from-white via-stone-100 to-stone-200 overflow-hidden">
      <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

      <div className="relative grid grid-cols-9 grid-rows-8 gap-4 h-full p-4">
        {/* Sidebar */}
        <div className="shadow-lg border border-stone-100 rounded-2xl row-span-8 flex bg-white/90">
          <Sidebar onSelectCategory={setselectedType} />
        </div>

        {/* Título */}
        <div className="col-span-6 rounded-2xl flex items-center text-4xl font-[Poppins] font-extrabold p-6 bg-white/80  mb-2 justify-between">
          <h1 className="text-stone-700 truncate">
            {selectedType ? `Categoría: ${selectedType}` : "¿Qué se te antoja hoy?"}
          </h1>
          <Button
            texto="Cancelar orden"
            onClick={handleCancelOrder}
          />
        </div>

        {/* Nueva Orden */}
        <div className="shadow-lg border border-stone-100 rounded-2xl row-span-8 col-span-2 flex flex-col p-6 bg-white/90 min-h-0 max-h-full overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 font-[Poppins] text-stone-700">Tu Pedido</h2>
          <div className="space-y-3 font-bold font-[Poppins] flex-1 min-h-0 overflow-y-auto">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderCard
                  key={index}
                  order={order}
                />
              ))
            ) : (
              <p className="text-lg font-bold text-stone-400">No hay productos añadidos</p>
            )}
          </div>
          {orders.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <div className="flex justify-between font-bold text-xl font-[Poppins] text-stone-700">
                <span>Total:</span>
                <span>
                  ${orders.reduce(
                    (sum, order) =>
                      sum +
                      calculateTotal(
                        {
                          itemId: order.productId,
                          milkId: order.milk,
                          sizeId: order.size,
                          flavourId: order.flavour,
                          toppings: Object.fromEntries(
                            (order.toppings || []).map(ot => [ot.topping, ot.quantity])
                          ),
                        },
                        menuItems,
                        toppingOptions,
                        milksOptions,
                        flavourOptions,
                        sizeItems
                      ).total,
                    0
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-center mt-6 gap-4">
                <Button
                  texto="Terminar orden"
                  onClick={handleSendOrder}
                />
              </div>
            </div>
          )}
        </div>

        {/* Menú de productos */}
        <div className="shadow-lg border border-stone-100 rounded-2xl row-span-7 col-span-6 overflow-y-auto p-6 scrollbar-hide bg-white/90 min-h-0 max-h-full"
          style={{ maxHeight: '100%' }}>
          <MenuItems category={selectedType} onSelectItem={handleSelectProduct} />
        </div>
      </div>
    </div>
  );
}

export default Menu;