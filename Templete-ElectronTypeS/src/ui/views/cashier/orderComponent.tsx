import React from "react";
import { OrderItem, calculateTotal, toppingOptions } from "./CashierData/useTickets";


interface OrderProps {
    order: OrderItem;
}



const OrderComponent: React.FC<OrderProps> = ({ order }) => {
    const {
        productName,
        sizeName,
        tempName,
        flavourName,
        milkName,
        sizePrice,
        milkPrice,
        flavourPrice,
        toppingsTotal,
        subtotal,
        iva,
        total,
    } = calculateTotal(order);

    return (
        <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-stone-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-stone-800">{productName}</h3>
                {tempName && <p className="text-sm text-stone-500">{tempName}</p>}
            </div>

            <div className="space-y-2 text-sm text-stone-700">
                <div className="flex justify-between">
                    <span className="text-stone-600">Tamaño:</span>
                    <span>{sizeName} <span className="text-stone-500">(${sizePrice})</span></span>
                </div>

                {flavourName && (
                    <div className="flex justify-between">
                        <span className="text-stone-600">Sabor:</span>
                        <span>{flavourName} <span className="text-stone-500">(${flavourPrice})</span></span>
                    </div>
                )}

                {milkName && (
                    <div className="flex justify-between">
                        <span className="text-stone-600">Leche:</span>
                        <span>{milkName} <span className="text-stone-500">(${milkPrice})</span></span>
                    </div>
                )}

                {order.toppings.length > 0 && (
                    <div className="pt-3">
                        <h4 className="text-sm font-medium text-stone-700 mb-2">Toppings:</h4>
                        <ul className="space-y-1">
                            {order.toppings.map((topping, index) => {
                                const toppingInfo = toppingOptions.find(t => t.id === topping.id);
                                if (!toppingInfo) return null;

                                const chargeable = Math.max(topping.quantity - toppingInfo.freecuantity, 0);
                                const total = chargeable * toppingInfo.price;

                                return (
                                    <li key={index} className="flex justify-between text-xs text-stone-600">
                                        <span>
                                            {toppingInfo.name} <span className="text-gray-400">(x{topping.quantity})</span>
                                        </span>
                                        {total > 0 && <span className="text-stone-700">+ ${total.toFixed(2)}</span>}
                                    </li>
                                );
                            })}
                        </ul>
                        {parseFloat(toppingsTotal) > 0 && (
                            <div className="text-right text-xs text-stone-600 mt-1">
                                Total toppings: <span className="font-medium">${toppingsTotal}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 space-y-1 text-sm text-stone-700">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                    <span>IVA (16%):</span>
                    <span>${iva}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-stone-200 text-stone-800">
                    <span>Total:</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    );
};


export default OrderComponent;