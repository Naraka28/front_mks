import React from "react";
import { getProducts } from "../../../services/productsServices";
import { getFlavors } from "../../../services/flavorServices";
import { getSizes } from "../../../services/sizeServices";
import { getToppings } from "../../../services/toppingsServices";
import { getMilks } from "../../../services/milksServices";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../../../services/ordersServices";
import { calculateTotal } from "./orderUtils";

interface OrderCardProps {
    order: Order;
    compact?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { data: menuItems = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
    const { data: flavourOptions = [] } = useQuery({ queryKey: ["flavors"], queryFn: getFlavors });
    const { data: sizeItems = [] } = useQuery({ queryKey: ["sizes"], queryFn: getSizes });
    const { data: toppingOptions = [] } = useQuery({ queryKey: ["toppings"], queryFn: getToppings });
    const { data: milksOptions = [] } = useQuery({ queryKey: ["milks"], queryFn: getMilks });

    if (!order?.id) return null;

    const item = menuItems.find(item => item.id === Number(order.productId || order.id));
    const size = sizeItems.find(size => size.id === Number(order.size));
    const flavour = flavourOptions.find(flavour => flavour.id === Number(order.flavour));

    // Calcular el total usando calculateTotal
    const orderForCalc = {
        itemId: order.productId || order.id,
        milkId: order.milk,
        sizeId: order.size,
        flavourId: order.flavour,
        toppings: Object.fromEntries(
            (order.orderToppings || []).map(ot => [ot.topping.id, ot.quantity])
        ),
    };
    const { total } = calculateTotal(
        orderForCalc,
        menuItems,
        toppingOptions,
        milksOptions,
        flavourOptions,
        sizeItems
    );

    return (
        <div className="flex items-center gap-3 p-3 bg-white/90 rounded-xl shadow border border-stone-100">
            <img
                src={item?.image}
                alt={item?.name}
                className="w-12 h-12 object-contain rounded-lg bg-white border border-stone-100 shadow-sm"
            />
            <div className="flex-1">
                <div className="text-base font-semibold text-stone-700">{item?.name || order.id}</div>
                <div className="text-xs text-stone-500">
                    {flavour?.name || order.flavour || ""} {size ? `- ${size.name}` : order.size ? `- ${order.size}` : ""}
                </div>
            </div>
            <span className="text-base font-semibold text-stone-700">
                ${total.toFixed(2)}
            </span>
        </div>
    );
};

export default OrderCard;