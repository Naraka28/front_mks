import React from "react";
import { Order } from "../../services/cashierServives";

interface OrderProps {
    order: Order;
}

const OrderComponent: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-stone-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-stone-800">{order.product.name}</h3>
                {order.temp?.name && <p className="text-sm text-stone-500">{order.temp.name}</p>}
            </div>

            <div className="space-y-2 text-sm text-stone-700">
                <div className="flex justify-between">
                    <span className="text-stone-600">Tamaño:</span>
                    <span>{order.size?.name}</span>
                </div>

                {order.flavour?.name && (
                    <div className="flex justify-between">
                        <span className="text-stone-600">Sabor:</span>
                        <span>{order.flavour.name}</span>
                    </div>
                )}

                {order.milk?.name && (
                    <div className="flex justify-between">
                        <span className="text-stone-600">Leche:</span>
                        <span>{order.milk.name}</span>
                    </div>
                )}

                {order.toppings && order.toppings.length > 0 && (
                    <div className="pt-3">
                        <h4 className="text-sm font-medium text-stone-700 mb-2">Toppings:</h4>
                        <ul className="space-y-1">
                            {order.toppings.map((topping, idx) => (
                                <li key={idx} className="flex justify-between text-xs text-stone-600">
                                    <span>{topping.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 space-y-1 text-sm text-stone-700">
                <div className="flex justify-between font-bold pt-2 text-stone-800">
                    <span>Total:</span>
                    <span>${order.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;