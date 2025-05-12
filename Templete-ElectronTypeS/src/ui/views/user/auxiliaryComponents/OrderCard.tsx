import React from "react";
import Prueba1 from "./../../../assets/Prueba1.png";
import Prueba2 from "./../../../assets/Prueba2.png";
import Prueba3 from "./../../../assets/Prueba3.png";
import Prueba4 from "./../../../assets/Prueba4.png";

const menuItems = [
    { id: 1, name: "Té caliente", category: "Bebida Caliente", icon: Prueba3, basePrice: 20 },
    { id: 2, name: "Espresso", category: "Cafés", icon: Prueba1, basePrice: 25 },
    { id: 3, name: "Latte", category: "Cafés", icon: Prueba1, basePrice: 30 },
    { id: 4, name: "Cappuccino", category: "Cafés", icon: Prueba1, basePrice: 35 },
    { id: 5, name: "Americano", category: "Cafés", icon: Prueba1, basePrice: 20 },
    { id: 6, name: "Frappé de Chocolate", category: "Bebida Fría", icon: Prueba2, basePrice: 40 },
    { id: 7, name: "Galleta", category: "Postre", icon: Prueba4, basePrice: 15 },
];
interface OrderCardProps {
    order: {
        itemId?: string;
        total?: number;
    };
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    if (!order?.itemId) return null;

    const item = menuItems.find(i => i.id === Number(order.itemId));
    if (!item) return null;

    return (
        <div className="flex items-center justify-between gap-3 p-3 bg-white/90 rounded-xl shadow border border-stone-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
                <img
                    src={item.icon}
                    alt={item.name}
                    className="w-10 h-10 object-contain rounded-lg bg-white border border-stone-100 shadow-sm"
                />
                <span className="text-base font-semibold text-stone-700">{item.name}</span>
            </div>
            <span className="text-lg font-bold text-stone-700">${order.total?.toFixed(2) || "0.00"}</span>
        </div>
    );
};
export default OrderCard;