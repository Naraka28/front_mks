import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sizes from "./Components/Sizes";
import Flavours from "./Components/Flavours";
import CoffeeBeans from "./Components/CoffeeBeans";
import Toppings from "./Components/Toppings";
import Boton from "./auxiliaryComponents/Button";
import OrderActions from "./Components/OrderActions";

const TOPPING_NAMES: Record<number, string> = {
    1: "Azúcar",
    2: "Canela",
    3: "Mascabado",
    4: "Svetia",
    5: "Fruta",
    6: "Nutella",
    7: "Shot",
    8: "Splenda"
};


const MenuSelected: React.FC = () => {
    const { itemId, sizeId, flavourId, coffeeBeansId } = useParams();
    const navigate = useNavigate();

    const [currentToppings, setCurrentToppings] = useState<Record<number, number>>({});
    const [showOrderActions, setShowOrderActions] = useState(false); // Estado para mostrar OrderActions

    const handleToppingsChange = (selectedToppings: Record<number, number>) => {
        setCurrentToppings(selectedToppings);
    };
    const handleSizeSelect = (selectedSizeId: number) => {
        navigate(`/menu/${itemId}/size/${selectedSizeId}`);
    };

    const handleFlavourSelect = (selectedFlavourId: number) => {
        navigate(`/menu/${itemId}/size/${sizeId}/flavour/${selectedFlavourId}`);
    };

    const handleCoffeeBeansSelect = (selectedCoffeeBeansId: number) => {
        navigate(`/menu/${itemId}/size/${sizeId}/flavour/${flavourId}/coffeeBeans/${selectedCoffeeBeansId}`);
    };

    const handleFinishSelection = () => {
        setShowOrderActions(true); // Mostrar OrderActions después de toppings
    };

    const goBack = () => {
        if (showOrderActions) {
            setShowOrderActions(false); // Regresar a selección de toppings
        } else if (coffeeBeansId) {
            navigate(`/menu/${itemId}/size/${sizeId}/flavour/${flavourId}`);
        } else if (flavourId) {
            navigate(`/menu/${itemId}/size/${sizeId}`);
        } else if (sizeId) {
            navigate(`/menu/${itemId}`);
        } else {
            navigate("/menu");
        }
    };


    return (
        <div className="h-screen w-screen manrope-500 bg-[#F7F2F2] overflow-hidden">
            <div className="relative grid grid-cols-8 grid-rows-8 gap-3 p-5 min-h-screen">
                {/* Header */}
                <div className="col-span-6 row-span-1 rounded-2xl flex justify-start items-center font-[Poppins] font-extrabold p-4">
                    <div className="text-2xl top-5 left-5 z-10">
                        <Boton
                            texto="Regresar"
                            tipo="regresar"
                            onClick={goBack}
                            className="pl-3 pr-4 py-2"
                        />
                    </div>
                    <h1 className="px-10 text-4xl">
                        {showOrderActions
                            ? "¿Qué deseas hacer con tu pedido?"
                            : coffeeBeansId
                                ? "Selecciona tus toppings"
                                : flavourId
                                    ? "Selecciona tipo de grano"
                                    : sizeId
                                        ? `Selecciona un sabor para tamaño ${sizeId}`
                                        : `¿Cómo se te antoja? ID: ${itemId}`}
                    </h1>
                </div>

                {/* Panel de Nueva Orden */}
                <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 col-span-2 flex flex-col justify-start items-center p-4 relative">
                    <p className="text-3xl font-[Poppins] font-black py-5 text-[#333333]">NUEVA ORDEN</p>
                    <div className="flex flex-col gap-4 w-full px-4 mt-auto mb-8">
                        {sizeId && <p>Tamaño: {sizeId}</p>}
                        {flavourId && <p>Sabor: {flavourId}</p>}
                        {coffeeBeansId && <p>Granos: {coffeeBeansId}</p>}
                        {Object.entries(currentToppings).map(([id, count]) => (
                            count > 0 && <p key={id}>{TOPPING_NAMES[Number(id)]}: {count}</p>
                        ))}
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-7 col-span-6 p-4 flex justify-center items-center"
                    style={{ maxHeight: 'calc(108vh - 200px)', overflow: 'hidden' }}>
                    <div className="w-full max-w-6xl">
                        {!sizeId ? (
                            <Sizes onSelectSize={handleSizeSelect} selectedCategory={null} />
                        ) : !flavourId ? (
                            <Flavours onSelectFlavour={handleFlavourSelect} />
                        ) : !coffeeBeansId ? (
                            <CoffeeBeans onSelectCoffeeBeans={handleCoffeeBeansSelect} />
                        ) : !showOrderActions ? (
                            <Toppings onSelectionChange={handleToppingsChange} />
                        ) : (
                            <OrderActions
                                itemId={itemId}
                                sizeId={sizeId}
                                flavourId={flavourId}
                                coffeeBeansId={coffeeBeansId}
                                toppings={currentToppings}
                            />
                        )}
                    </div>
                    {/* Botón "Terminar pedido" solo visible en la etapa de toppings */}
                    {coffeeBeansId && !showOrderActions && (
                        <div className="absolute bottom-6 p-4">
                            <Boton
                                texto="Terminar pedido"
                                tipo="terminar"
                                onClick={handleFinishSelection}
                                className="py-3 px-8 text-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuSelected;
