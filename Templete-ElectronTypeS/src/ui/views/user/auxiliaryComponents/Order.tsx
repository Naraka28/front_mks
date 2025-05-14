import OrderCard from "./OrderCard";
import { getProducts } from "../../../services/productsServices";
import { getToppings } from "../../../services/toppingsServices";
import { getMilks } from "../../../services/milksServices";
import { getFlavors } from "../../../services/flavorServices";
import { getSizes } from "../../../services/sizeServices";
import { getTemps } from "../../../services/tempsServices";
import { useQuery } from "@tanstack/react-query";
import { OrderCreate } from "../../../services/ordersServices";
import { calculateTotal } from "./orderUtils";


interface OrderProps {
    order: OrderCreate;
    compact?: boolean;
}


const useOrderData = () => {
    const { data: menuItems = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
    const { data: toppingOptions = [] } = useQuery({ queryKey: ["toppings"], queryFn: getToppings });
    const { data: milksOptions = [] } = useQuery({ queryKey: ["milks"], queryFn: getMilks });
    const { data: flavourOptions = [] } = useQuery({ queryKey: ["flavors"], queryFn: getFlavors });
    const { data: sizeItems = [] } = useQuery({ queryKey: ["sizes"], queryFn: getSizes });
    const { data: tempOptions = [] } = useQuery({ queryKey: ["temps"], queryFn: getTemps });

    return { menuItems, toppingOptions, milksOptions, flavourOptions, sizeItems, tempOptions };
};


const OrderComponent: React.FC<OrderProps> = ({ order, compact = false }) => {
    const { menuItems, toppingOptions, milksOptions, flavourOptions, sizeItems, tempOptions } = useOrderData();


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

    // Mapea el objeto order a la estructura esperada por calculateTotal
    const orderForCalc = {
        itemId: order.productId || order.id,
        milkId: order.milk,
        sizeId: order.size,
        flavourId: order.flavour,
        toppings: Object.fromEntries(
            (order.toppings || []).map(ot => [ot.id, ot.quantity])
        ),
    };

    // Llama a calculateTotal con el mapeo correcto
    const { basePrice, toppingsTotal, total, milkPrice } = calculateTotal(
        orderForCalc,
        menuItems,
        toppingOptions,
        milksOptions,
        flavourOptions,
        sizeItems
    );

    console.log("OrderComponent", order);

    const itemName = menuItems.find(item => item.id === Number(order.productId))?.name;
    const sizeName = sizeItems.find(size => size.id === Number(order.size))?.name;
    const flavourName = flavourOptions.find(flavour => flavour.id === Number(order.flavour))?.name;
    const tempName = tempOptions.find(temp => temp.id === Number(order.temp))?.name;

    // Si tienes CoffeeBeansOptions, asegúrate de importarlo o definirlo
    const coffeeBeansName = undefined; // Ajusta según tu lógica
    const milkName = milksOptions.find(milk => milk.id === Number(order.milk))?.name;

    const sizePrice = `$${(sizeItems.find(size => size.id === Number(order.size))?.price || 0).toFixed(2)}`;
    const flavourPrice = `$${(flavourOptions.find(flavour => flavour.id === Number(order.flavour))?.price || 0).toFixed(2)}`;
    const milkPriceStr = `$${milkPrice.toFixed(2)}`;

    const personalizationTotal =
        parseFloat(sizePrice.replace('$', '')) +
        parseFloat(flavourPrice.replace('$', '')) +
        parseFloat(milkPriceStr.replace('$', ''));

    return (
        <div className=" rounded-2xl w-full mx-auto h-full flex flex-col ">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <h1 className="text-3xl font-[Poppins] font-extrabold text-stone-800 text-center mb-6">
                Detalles de tu producto
            </h1>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border border-stone-100 flex flex-col items-center">
                <img
                    src={menuItems.find(item => item.id === Number(order.id))?.image}
                    alt={itemName}
                    className="w-28 h-28 object-contain bg-white rounded-2xl shadow border border-stone-100 mb-3"
                />
                <span className="text-2xl font-bold text-stone-800">{itemName}</span>
                <p className="text-lg text-stone-600 font-semibold">Base: <span className="text-stone-800">${basePrice}</span></p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 border border-stone-100 mb-2">
                <h2 className="text-lg font-semibold text-stone-700 mb-2">Personalización</h2>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1">
                        {tempName && <p className="text-base text-stone-600">- {tempName}</p>}
                        {sizeName && <p className="text-base text-stone-600">- {sizeName}</p>}
                        {flavourName && <p className="text-base text-stone-600">- {flavourName}</p>}
                        {coffeeBeansName && <p className="text-base text-stone-600">- {coffeeBeansName}</p>}
                        {milkName && <p className="text-base text-stone-600">- {milkName}</p>}
                    </div>
                    <div className="text-right space-y-1">
                        {tempName && (
                            <p className="text-base text-stone-500">
                                {tempName ? '-' : `$0.00`}
                            </p>
                        )}
                        {sizeName && (
                            <p className="text-base text-stone-500">
                                {parseFloat(sizePrice.replace('$', '')) === 0 ? '-' : sizePrice}
                            </p>
                        )}
                        {flavourName && (
                            <p className="text-base text-stone-500">
                                {parseFloat(flavourPrice.replace('$', '')) === 0 ? '-' : flavourPrice}
                            </p>
                        )}
                        {coffeeBeansName && (
                            <p className="text-base text-stone-500">
                                {'-'}
                            </p>
                        )}
                        {milkName && (
                            <p className="text-base text-stone-500">
                                {parseFloat(milkPriceStr.replace('$', '')) === 0 ? '-' : milkPriceStr}
                            </p>
                        )}
                    </div>
                </div>
                <div className="border-t border-stone-200 mt-2 pt-2 flex justify-between">
                    <span></span>
                    <span className="border-stone-200 text-base text-right font-semibold text-stone-700">+${personalizationTotal.toFixed(2)}</span>
                </div>
            </div>

            {milkName && order.toppings && order.toppings.length > 0 && (
                <div className="bg-white rounded-xl shadow p-4 border border-stone-100">
                    <h3 className="text-lg font-semibold text-stone-700 mb-2">Toppings</h3>
                    <ul className="text-base text-stone-600 divide-y divide-stone-100">
                        {order.toppings.map((ot, idx) => {
                            if (Number(ot.quantity) === 0) return null;
                            const topping = toppingOptions.find(t => t.id === Number(ot.topping));
                            const toppingName = topping?.name || '';
                            const toppingPrice = topping?.price || 0;
                            const toppingChargeableQuantity = Math.max(Number(ot.quantity) - (topping?.free_quantity || 0), 0);
                            const toppingTotal = toppingChargeableQuantity * toppingPrice;
                            return (
                                <li key={idx} className="flex justify-between py-1">
                                    <span>{toppingName} <span className="text-xs text-stone-400">({Number(ot.quantity)})</span></span>
                                    <span>
                                        {toppingTotal === 0 ? '-' : `$${toppingTotal.toFixed(2)}`}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    {toppingsTotal > 0 && (
                        <p className="border-t mt-2 pt-2 border-stone-200 text-base text-right font-semibold text-stone-700">
                            +${toppingsTotal.toFixed(2)}
                        </p>
                    )}
                </div>
            )}

            <div className="bg-white rounded-xl shadow p-4 border border-stone-100 mt-2">
                <div className="">
                    <p className="text-xl font-bold flex justify-between text-stone-800">
                        Total: <span>${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default OrderComponent;