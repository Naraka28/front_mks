import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sizes from "./Components/Sizes";
import Flavours from "./Components/Flavours";
import CoffeeBeans from "./Components/CoffeeBeans";
import Toppings from "./Components/Toppings";
import Boton from "./auxiliaryComponents/Button";
import OrderActions from "./Components/OrderActions";
import Temperature from "./Components/Temperature";
import Milks from "./Components/Milks";
import Order from "./auxiliaryComponents/Order";
import { useOrders } from "./auxiliaryComponents/OrderContext";


// Mock or import toppingOptions
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

const MenuSelected: React.FC = () => {
    const { addOrder } = useOrders();
    const { itemId, tempId, sizeId, flavourId, coffeeBeansId, milkId } = useParams();
    const navigate = useNavigate();

    const [currentToppings, setCurrentToppings] = useState<Record<number, number>>({});
    const [showOrderActions, setShowOrderActions] = useState(false);

    // Estado para manejar toda la orden
    const [order, setOrder] = useState({
        itemId,
        tempId,
        sizeId,
        flavourId,
        coffeeBeansId,
        milkId,
        toppings: currentToppings,
        toppingsTotal: 0,
        subtotal: 0,
        iva: 0,
        descuento: 0,
        total: 0,
    });

    // Recalcular el total cada vez que cambia un dato
    useEffect(() => {
        const basePrice = 50; // Precio base
        const toppingPrice = Object.values(currentToppings).reduce((acc, count) => acc + count * 5, 0);
        const toppingsTotal = toppingPrice; // Initialize toppingsTotal
        const subtotal = basePrice + toppingPrice;
        const iva = subtotal * 0.16;
        const descuento = subtotal * 0.10;
        const total = subtotal + iva - descuento;

        setOrder((prevOrder) => ({
            ...prevOrder,
            itemId,
            tempId,
            sizeId,
            flavourId,
            coffeeBeansId,
            milkId,
            toppingsTotal,
            subtotal,
            iva,
            descuento,
            total
        }));
    }, [itemId, tempId, sizeId, flavourId, coffeeBeansId, milkId, currentToppings]);

    const handleTempSelect = (selectedTempId: number) => {
        navigate(`/menu/${itemId}/temp/${selectedTempId}`);
    };

    const handleMilkSelect = (selectedMilkId: number) => {
        navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}/flavour/${flavourId}/coffeeBeans/${coffeeBeansId}/milk/${selectedMilkId}`);
    };

    const handleSizeSelect = (selectedSizeId: number) => {
        navigate(`/menu/${itemId}/temp/${tempId}/size/${selectedSizeId}`);
    };

    const handleFlavourSelect = (selectedFlavourId: number) => {
        navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}/flavour/${selectedFlavourId}`);
    };

    const handleCoffeeBeansSelect = (selectedCoffeeBeansId: number) => {
        navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}/flavour/${flavourId}/coffeeBeans/${selectedCoffeeBeansId}`);
    };

    const handleToppingsChange = (selectedToppings: Record<number, number>) => {
        setCurrentToppings(selectedToppings);

        // Calcular el precio total de los toppings considerando la cantidad gratuita
        let toppingsTotal = 0;

        for (const [id, quantity] of Object.entries(selectedToppings)) {
            const topping = toppingOptions.find(t => t.id === Number(id));
            if (topping) {
                const paidQuantity = Math.max(quantity - topping.freecuantity, 0);
                toppingsTotal += paidQuantity * topping.price;
            }
        }

        setOrder((prevOrder) => ({
            ...prevOrder,
            toppings: selectedToppings,
            toppingsTotal,
            subtotal: 50 + toppingsTotal, // Precio base + toppings
            iva: (50 + toppingsTotal) * 0.16,
            descuento: (50 + toppingsTotal) * 0.10,
            total: (50 + toppingsTotal) * 1.06 - (50 + toppingsTotal) * 0.10,
        }));
    };


    const handleFinishSelection = () => {
        addOrder({
            itemId: order.itemId,
            tempId: order.tempId,
            sizeId: order.sizeId,
            flavourId: order.flavourId,
            coffeeBeansId: order.coffeeBeansId,
            milkId: order.milkId,
            toppings: order.toppings,
            total: order.total
        });
        setShowOrderActions(true);
    };

    function goBack(): void {
        if (milkId) {
            navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}/flavour/${flavourId}/coffeeBeans/${coffeeBeansId}`);
        } else if (coffeeBeansId) {
            navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}/flavour/${flavourId}`);
        } else if (flavourId) {
            navigate(`/menu/${itemId}/temp/${tempId}/size/${sizeId}`);
        } else if (sizeId) {
            navigate(`/menu/${itemId}/temp/${tempId}`);
        } else if (tempId) {
            navigate(`/menu/${itemId}`);
        } else {
            navigate("/menu");
        }
    }

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
            <div className="relative grid grid-cols-8 grid-rows-8 gap-4 h-full p-4">
                {/* Header */}
                <div className="col-span-6 row-span-1 rounded-2xl flex items-center font-[Poppins] font-extrabold px-8 py-5 bg-white/90 mb-4">
                    <div className="text-4xl z-10 mr-4">
                        <Boton
                            texto=""
                            tipo="regresar"
                            icono={
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                            }
                            onClick={goBack}
                            className="pl-3 pr-4 py-2"
                        />
                    </div>
                    <h1 className="px-6 text-3xl text-stone-700 truncate">
                        {showOrderActions
                            ? "¿Qué deseas hacer con tu pedido?"
                            : milkId
                                ? "Selecciona tus toppings"
                                : coffeeBeansId
                                    ? "Selecciona tipo de leche"
                                    : flavourId
                                        ? "Selecciona tipo de grano"
                                        : sizeId
                                            ? `Selecciona un sabor para tamaño ${sizeId}`
                                            : tempId
                                                ? "Selecciona tamaño"
                                                : `Selecciona temperatura para ID: ${itemId}`}
                    </h1>
                </div>

                {/* Panel de Nueva Orden */}
                <div className="shadow-lg border border-stone-100 rounded-2xl row-span-8 col-span-2 flex flex-col justify-start items-center p-6 bg-white/90 min-h-0 max-h-full overflow-y-auto scrollbar-hide">
                    <Order order={order} />
                </div>

                {/* Contenedor de selección */}
                <div className="shadow-lg border border-stone-100 rounded-2xl row-span-7 col-span-6 relative flex bg-white/90 min-h-0 max-h-full">
                    <div className="w-full overflow-y-auto flex items-center justify-center p-6 scrollbar-hide">
                        {!tempId ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <Temperature onSelectTemp={handleTempSelect} productId={Number(itemId)} />
                            </div>
                        ) : !sizeId ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <Sizes onSelectSize={handleSizeSelect} productId={Number(itemId)} />
                            </div>
                        ) : !flavourId ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <Flavours onSelectFlavour={handleFlavourSelect} productId={Number(itemId)} />
                            </div>
                        ) : !coffeeBeansId ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <CoffeeBeans onSelectCoffeeBeans={handleCoffeeBeansSelect} />
                            </div>
                        ) : !milkId ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <Milks onSelectMilk={handleMilkSelect} productId={Number(itemId)} />
                            </div>
                        ) : !showOrderActions ? (
                            <div className="max-w-5xl w-full mx-auto">
                                <Toppings onSelectionChange={handleToppingsChange} productId={Number(itemId)} />
                            </div>
                        ) : (
                            <div className="max-w-5xl w-full mx-auto">
                                <OrderActions
                                    itemId={itemId}
                                    tempId={tempId}
                                    sizeId={sizeId}
                                    flavourId={flavourId}
                                    coffeeBeansId={coffeeBeansId}
                                    milkId={milkId}
                                    toppings={currentToppings}
                                />
                            </div>
                        )}
                    </div>

                    {/* Botón Terminar Pedido */}
                    {milkId && !showOrderActions && (
                        <div className="absolute bottom-6 right-6">
                            <Boton
                                texto="Terminar pedido"
                                tipo="terminar"
                                onClick={handleFinishSelection}
                                className="size-full text-lg font-bold shadow-lg bg-white rounded-xl border-2 border-[#E8E8E8] hover:bg-[#F7F2F2] transition duration-300 ease-in-out flex items-center justify-center"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuSelected;
