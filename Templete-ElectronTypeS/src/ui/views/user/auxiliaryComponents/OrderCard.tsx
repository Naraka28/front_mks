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
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <span className="text-lg font-medium">{item.name}</span>
            <span className="text-lg font-bold">${order.total?.toFixed(2) || "0.00"}</span>
        </div>
    );
};
export default OrderCard;