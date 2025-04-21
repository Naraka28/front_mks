import React from "react";


interface OrderItem {
    ordenId: string;
    itemId: string;
    tempId: string;
    sizeId: string;
    flavourId?: string; // Hacer opcionales los campos que pueden faltar
    coffeeBeansId?: string;
    milkId?: string;
    toppings?: Record<number, number>; // Mejor tipo para toppings
    toppingsTotal?: number;
    subtotal?: number;
    iva?: number;
    total?: number;
}

interface OrderProps {
    order: OrderItem;
}

const menuItems = [
    { id: 1, name: "Té caliente", category: "Bebida Caliente", basePrice: 20 },
    { id: 2, name: "Espresso", category: "Cafés", basePrice: 25 },
    { id: 3, name: "Latte", category: "Cafés", basePrice: 30 },
    { id: 4, name: "Cappuccino", category: "Cafés", basePrice: 35 },
    { id: 5, name: "Americano", category: "Cafés", basePrice: 20 },
    { id: 6, name: "Frappé", category: "Bebida Fría", basePrice: 40 },
    { id: 7, name: "Galleta", category: "Postre", basePrice: 15 },
];

const toppingOptions = [
    { id: 1, name: "Azúcar", price: 2, freecuantity: 1, maxcuantity: 10 },
    { id: 2, name: "Canela", price: 1, freecuantity: 2, maxcuantity: 10 },
    { id: 3, name: "Mascabado", price: 3, freecuantity: 3, maxcuantity: 10 },
    { id: 4, name: "Svetia", price: 2.5, freecuantity: 3, maxcuantity: 10 },
    { id: 5, name: "Fruta", price: 1, freecuantity: 1, maxcuantity: 10 },
    { id: 6, name: "Nutella", price: 6, freecuantity: 1, maxcuantity: 10 },
    { id: 7, name: "Shot", price: 3, freecuantity: 1, maxcuantity: 10 },
    { id: 8, name: "Splenda", price: 1, freecuantity: 1, maxcuantity: 10 }
];

const tempOptions = [
    { id: 1, name: "Caliente" },
    { id: 2, name: "Tibio" },
    { id: 3, name: "Frío" }
];

const sizeItems = [
    { id: 1, name: "Short", category: "size", price: 0 },
    { id: 2, name: "Tall", category: "size", price: 5 },
    { id: 3, name: "Grande", category: "size", price: 10 },
    { id: 4, name: "Venti", category: "size", price: 15 },
];

const flavourOptions = [
    { id: 1, name: "Vainilla", price: 0 },
    { id: 2, name: "Chocolate", price: 15 },
    { id: 3, name: "Caramelo", price: 0 },
    { id: 4, name: "Avellana", price: 0 },
    { id: 5, name: "Moka", price: 0 },
    { id: 6, name: "Café", price: 12 },
    { id: 7, name: "Coco", price: 0 },
    { id: 8, name: "Almendra", price: 18 }
];

const CoffeeBeansOptions = [
    { id: 1, name: "Regular" },
    { id: 2, name: "Descafeinado" },
];

const milksOptions = [
    { id: 1, name: "Entera", price: 1.5 },
    { id: 2, name: "Deslactosada" },
    { id: 3, name: "Almendras", price: 2.0 },
    { id: 4, name: "Avena", price: 2.0 },
];

const calculateTotal = (order: OrderProps["order"]) => {
    if (!order?.itemId) return { subtotal: 0, toppingsTotal: 0, total: 0, iva: 0, basePrice: 0 };

    const product = menuItems.find(item => item.id === Number(order.itemId));
    if (!product) return { subtotal: 0, toppingsTotal: 0, total: 0, iva: 0, basePrice: 0 };

    const milk = milksOptions.find(m => m.id === Number(order.milkId));
    const milkPrice = milk?.price || 0;

    let toppingsTotal = 0;
    if (order.toppings) {
        Object.entries(order.toppings).forEach(([id, quantity]) => {
            const topping = toppingOptions.find(t => t.id === Number(id));
            if (topping) {
                const chargeableQuantity = Math.max(quantity - topping.freecuantity, 0);
                toppingsTotal += chargeableQuantity * topping.price;
            }
        });
    }

    if (!milk) {
        toppingsTotal = 0;
        order.toppings = {};
    }

    const size = sizeItems.find(s => s.id === Number(order.sizeId));
    const sizePrice = size?.price || 0;

    const flavour = flavourOptions.find(f => f.id === Number(order.flavourId));
    const flavourPrice = flavour?.price || 0;

    const basePrice = product.basePrice;

    const subtotal = basePrice + sizePrice + flavourPrice + milkPrice + toppingsTotal;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return {
        basePrice: parseFloat(basePrice.toFixed(2)),
        milkPrice: parseFloat(milkPrice.toFixed(2)),
        toppingsTotal: parseFloat(toppingsTotal.toFixed(2)),
        subtotal: parseFloat(subtotal.toFixed(2)),
        iva: parseFloat(iva.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
};

const OrderComponent: React.FC<OrderProps> = ({ order }) => {

    console.log("OrderComponent", order);

    if (!order) {
        return (
            <h1 className="text-3xl font-[Poppins] font-extrabold text-center">
                No hay ordenes pendientes
            </h1>
        );
    }

    const { basePrice, subtotal, toppingsTotal, total, iva } = calculateTotal(order);

    const orderId = order.ordenId;
    const itemName = menuItems.find(item => item.id === Number(order.itemId))?.name;
    const sizeName = sizeItems.find(size => size.id === Number(order.sizeId))?.name;
    const flavourName = flavourOptions.find(flavour => flavour.id === Number(order.flavourId))?.name;
    const tempName = tempOptions.find(temp => temp.id === Number(order.tempId))?.name;
    const coffeeBeansName = CoffeeBeansOptions.find(bean => bean.id === Number(order.coffeeBeansId))?.name;
    const milkName = milksOptions.find(milk => milk.id === Number(order.milkId))?.name;

    const sizePrice = `$${(sizeItems.find(size => size.id === Number(order.sizeId))?.price || 0).toFixed(2)}`;
    const flavourPrice = `$${(flavourOptions.find(flavour => flavour.id === Number(order.flavourId))?.price || 0).toFixed(2)}`;
    const milkPrice = `$${(milksOptions.find(milk => milk.id === Number(order.milkId))?.price || 0).toFixed(2)}`;

    return (
        <div className="p-6 rounded-2xl w-full mx-auto h-full">
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            <div className="bg-[#FAF9F6] p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-2">
                    <h2 className="text-xl font-bold">Orden {orderId}</h2>
                </div>

                <div className="flex items-center justify-between mb-4 w-full">
                    <div className="w-1/2">
                        <p className="text-lg font-semibold">{itemName}</p>
                        <p className="text-md text-gray-700">{tempName}</p>
                        <p className="text-md text-gray-700">{sizeName}</p>
                        <p className="text-md text-gray-700">{flavourName}</p>
                        <p className="text-md text-gray-700">{coffeeBeansName}</p>
                        <p className="text-md text-gray-700">{milkName}</p>
                    </div>
                    <div className="w-1/2 text-right">
                        <p className="text-lg font-bold">${basePrice.toFixed(2)}</p>
                        {tempName && <p className="text-md text-gray-700">$0.00</p>}
                        {sizeName && <p className="text-md text-gray-700">{sizePrice}</p>}
                        {flavourName && <p className="text-md text-gray-700">{flavourPrice}</p>}
                        {coffeeBeansName && <p className="text-md text-gray-700">$0.00</p>}
                        {milkName && <p className="text-md text-gray-700">{milkPrice}</p>}
                    </div>
                </div>

                {milkName && order.toppings && Object.keys(order.toppings).length > 0 && (
                    <>
                        <h3 className="text-lg font-semibold">Toppings:</h3>
                        <ul className="text-md text-gray-800">
                            {Object.entries(order.toppings).map(([key, value]) => {
                                if (value === 0) return null;
                                const toppingName = toppingOptions.find(t => t.id === Number(key))?.name;
                                const toppingPrice = toppingOptions.find(t => t.id === Number(key))?.price || 0;
                                const toppingChargeableQuantity = Math.max(value - (toppingOptions.find(t => t.id === Number(key))?.freecuantity || 0), 0);
                                const toppingTotal = toppingChargeableQuantity * toppingPrice;
                                return (
                                    <li key={key} className="flex justify-between">
                                        <span>{toppingName} ({value})</span>
                                        <span>${toppingTotal.toFixed(2)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        {toppingsTotal > 0 && (
                            <p className="border-t mt-2 pt-2 border-gray-300 text-md text-right font-semibold">
                                +${toppingsTotal.toFixed(2)}
                            </p>
                        )}
                    </>
                )}

                <div className="bg-[#FAF9F6] p-3 rounded-xl shadow-md">
                    <div className="mt-4 text-md">
                        <p>IVA: <span className="float-right">${iva.toFixed(2)}</span></p>
                        <p>Subtotal: <span className="float-right">${subtotal.toFixed(2)}</span></p>
                    </div>

                    <div className="border-t border-gray-300 mt-2 pt-2">
                        <p className="text-lg font-bold">
                            Total: <span className="float-right">${total.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;