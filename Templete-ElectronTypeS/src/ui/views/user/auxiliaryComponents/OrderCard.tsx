import React from "react";
import { getProducts } from "../../../services/productsServices";
import { getFlavors } from "../../../services/flavorServices";
import { getSizes } from "../../../services/sizeServices";
import { getToppings } from "../../../services/toppingsServices";
import { getMilks } from "../../../services/milksServices";
import { useQuery } from "@tanstack/react-query";

interface OrderCardProps {
    order: {
        itemId?: string;
        tempId?: string;
        sizeId?: string;
        flavourId?: string;
        coffeeBeansId?: string;
        milkId?: string;
        toppings?: Record<number, number>;
        toppingsTotal?: number;
        subtotal?: number;
        iva?: number;
        total?: number;
    };
    compact?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
    order,
}) => {
    const { data: menuItems = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
    const { data: flavourOptions = [] } = useQuery({ queryKey: ["flavors"], queryFn: getFlavors });
    const { data: sizeItems = [] } = useQuery({ queryKey: ["sizes"], queryFn: getSizes });
    const { data: toppingOptions = [] } = useQuery({ queryKey: ["toppings"], queryFn: getToppings });
    const { data: milksOptions = [] } = useQuery({ queryKey: ["milks"], queryFn: getMilks });

    if (!order?.itemId) return null;

    const item = menuItems.find(i => i.id === Number(order.itemId));
    const flavour = flavourOptions.find(f => f.id === Number(order.flavourId));
    const size = sizeItems.find(s => s.id === Number(order.sizeId));
    const milk = milksOptions.find(m => m.id === Number(order.milkId));
    const milkPrice = milk?.price || 0;

    // Calcular toppingsTotal igual que en Order.tsx
    let toppingsTotal = 0;
    if (order.toppings) {
        Object.entries(order.toppings).forEach(([id, free_quantity]) => {
            const topping = toppingOptions.find(t => t.id === Number(id));
            if (topping) {
                const quantity = Number(free_quantity);
                const freeQuantity = topping.free_quantity || 0;
                const pricePerUnit = topping.price || 0;
                const chargeableQuantity = Math.max(quantity - freeQuantity, 0);
                toppingsTotal += chargeableQuantity * pricePerUnit;
            }
        });
    }
    // Si no hay leche, no hay toppings
    if (!milk) {
        toppingsTotal = 0;
    }

    const sizePrice = size?.price || 0;
    const flavourPrice = flavour?.price || 0;
    const basePrice = item?.base_price || 0;

    const total = basePrice + sizePrice + flavourPrice + milkPrice + toppingsTotal;

    if (!item) return null;

    return (
        <div className="flex items-center justify-between gap-3 p-3 bg-white/90 rounded-xl shadow border border-stone-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-lg bg-white border border-stone-100 shadow-sm"
                />
                <div>
                    <div className="text-base font-semibold text-stone-700">{item.name}</div>
                    <div className="text-xs text-stone-500">
                        {flavour?.name || ""} {size ? `- ${size.name}` : ""}
                    </div>
                </div>
            </div>
            <span className="text-base font-semibold text-stone-700">
                ${total.toFixed(2)}
            </span>
        </div>
    );
};

export default OrderCard;