import SmallSizeIcon from "./../../../assets/Prueba1.png";
import TallSizeIcon from "./../../../assets/Prueba1.png";
import GrandeSizeIcon from "./../../../assets/Prueba1.png";
import VentiSizeIcon from "./../../../assets/Prueba1.png";
import Prueba1 from "./../../../assets/Prueba1.png";
import Prueba2 from "./../../../assets/Prueba2.png";
import Prueba3 from "./../../../assets/Prueba3.png";
import Prueba4 from "./../../../assets/Prueba4.png";
import OrderCard from "./OrderCard";


interface OrderProps {
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



const menuItems = [
    { id: 1, name: "Té caliente", category: "Bebida Caliente", icon: Prueba3, basePrice: 20 },
    { id: 2, name: "Espresso", category: "Cafés", icon: Prueba1, basePrice: 25 },
    { id: 3, name: "Latte", category: "Cafés", icon: Prueba1, basePrice: 30 },
    { id: 4, name: "Cappuccino", category: "Cafés", icon: Prueba1, basePrice: 35 },
    { id: 5, name: "Americano", category: "Cafés", icon: Prueba1, basePrice: 20 },
    { id: 6, name: "Frappé de Chocolate", category: "Bebida Fría", icon: Prueba2, basePrice: 40 },
    { id: 7, name: "Galleta", category: "Postre", icon: Prueba4, basePrice: 15 },
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
    { id: 1, name: "Caliente", icon: "/icons/hot.png" },
    { id: 2, name: "Tibio", icon: "/icons/warm.png" },
    { id: 3, name: "Frío", icon: "/icons/cold.png" }
];

const sizeItems = [
    { id: 1, name: "Short", category: "size", icon: SmallSizeIcon, price: 0 },
    { id: 2, name: "Tall", category: "size", icon: TallSizeIcon, price: 5 },
    { id: 3, name: "Grande", category: "size", icon: GrandeSizeIcon, price: 10 },
    { id: 4, name: "Venti", category: "size", icon: VentiSizeIcon, price: 15 },
];

const flavourOptions = [
    { id: 1, name: "Vainilla", icon: Prueba1, price: 0 },
    { id: 2, name: "Chocolate", icon: Prueba1, price: 15 },
    { id: 3, name: "Caramelo", icon: Prueba1, price: 0 },
    { id: 4, name: "Avellana", icon: Prueba1, price: 0 },
    { id: 5, name: "Moka", icon: Prueba1, price: 0 },
    { id: 6, name: "Café", icon: Prueba1, price: 12 },
    { id: 7, name: "Coco", icon: Prueba1, price: 0 },
    { id: 8, name: "Almendra", icon: Prueba1, price: 18 }
];


const CoffeeBeansOptions = [
    { id: 1, name: "Regular", icon: Prueba1 },
    { id: 2, name: "Descafeinado", icon: Prueba1 },
];

const milksOptions = [
    { id: 1, name: "Entera", icon: "/icons/whole-milk.png", price: 1.5 },
    { id: 2, name: "Deslactosada", icon: "/icons/lactose-free.png" },
    { id: 3, name: "Almendras", icon: "/icons/almond-milk.png", price: 2.0 },
    { id: 4, name: "Avena", icon: "/icons/oat-milk.png" }
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


const Order: React.FC<OrderProps> = ({ order, compact = false }) => {
    if (!order) {
        return (
            <h1 className="text-3xl font-[Poppins] font-extrabold text-center">
                Nueva Orden
            </h1>
        );
    }

    if (compact) {
        return <OrderCard order={order} />;
    }

    const { basePrice, subtotal, toppingsTotal, total, iva } = calculateTotal(order);

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
        <div className="bg-white/90 rounded-2xl w-full mx-auto h-full shadow-lg border border-stone-100 p-6 flex flex-col">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <h1 className="text-2xl font-[Poppins] font-extrabold text-stone-700 text-center mb-4">
                Nueva Orden
            </h1>

            <div className="bg-white rounded-xl shadow p-4 mb-4 border border-stone-100">
                <div className="flex flex-col items-center mb-2">
                    <img
                        src={menuItems.find(item => item.id === Number(order.itemId))?.icon}
                        alt=""
                        className="w-24 h-24 object-contain bg-white rounded-xl shadow border border-stone-100 mb-2"
                    />
                    <span className="text-xl font-semibold text-stone-700">{itemName}</span>
                    <p className="text-base text-stone-700 font-bold">${basePrice.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="space-y-1">
                        {tempName && <p className="text-base text-stone-600">{tempName}</p>}
                        {sizeName && <p className="text-base text-stone-600">{sizeName}</p>}
                        {flavourName && <p className="text-base text-stone-600">{flavourName}</p>}
                        {coffeeBeansName && <p className="text-base text-stone-600">{coffeeBeansName}</p>}
                        {milkName && <p className="text-base text-stone-600">{milkName}</p>}
                    </div>
                    <div className="text-right space-y-1">
                        {tempName && <p className="text-base text-stone-500">$0.00</p>}
                        {sizeName && <p className="text-base text-stone-500">{sizePrice}</p>}
                        {flavourName && <p className="text-base text-stone-500">{flavourPrice}</p>}
                        {coffeeBeansName && <p className="text-base text-stone-500">$0.00</p>}
                        {milkName && <p className="text-base text-stone-500">{milkPrice}</p>}
                    </div>
                </div>

                {milkName && order.toppings && Object.keys(order.toppings).length > 0 && (
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold text-stone-700 mb-1">Toppings:</h3>
                        <ul className="text-base text-stone-600">
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
                            <p className="border-t mt-2 pt-2 border-stone-200 text-base text-right font-semibold text-stone-700">+${toppingsTotal.toFixed(2)}</p>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow p-4 border border-stone-100 mt-auto">
                <div className="text-base mb-2">
                    <p className="flex justify-between">IVA: <span className="font-semibold">${iva.toFixed(2)}</span></p>
                    <p className="flex justify-between">Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>
                </div>
                <div className="border-t border-stone-200 pt-2 mt-2">
                    <p className="text-xl font-bold flex justify-between text-stone-700">
                        Total: <span>${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Order;