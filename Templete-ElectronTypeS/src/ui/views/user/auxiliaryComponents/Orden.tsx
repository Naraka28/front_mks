import { useLocation } from "react-router-dom";

// Al inicio del componente OrderConfirmation
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




const OrderConfirmation = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>No se encontraron datos del pedido</div>;
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Resumen de tu pedido</h1>

            <div className="space-y-2 mb-6">
                <p><span className="font-semibold">Producto:</span> {state.itemId}</p>
                <p><span className="font-semibold">Tamaño:</span> {state.sizeId}</p>
                <p><span className="font-semibold">Sabor:</span> {state.flavourId}</p>
                <p><span className="font-semibold">Granos:</span> {state.coffeeBeansId}</p>
            </div>

            {state.toppings && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Toppings:</h2>
                    <ul className="space-y-1">
                        {Object.entries(state.toppings).map(([id, quantity]) => {
                            if (quantity === 0) return null;
                            const toppingName = TOPPING_NAMES[Number(id)];
                            return (
                                <li key={id} className="flex justify-between">
                                    <span>{toppingName}</span>
                                    <span>{String(quantity)}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Confirmar Pedido
            </button>
        </div>
    );
};

export default OrderConfirmation;