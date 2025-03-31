import { useEffect } from "react";
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

    const orderNumber = Math.floor(Math.random() * 10000);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/userhome";
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    

    return (
        // <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        //     <h1 className="text-2xl font-bold mb-4">Resumen de tu pedido</h1>

        //     <div className="space-y-2 mb-6">
        //         <p><span className="font-semibold">Producto:</span> {state.itemId}</p>
        //         <p><span className="font-semibold">Tamaño:</span> {state.sizeId}</p>
        //         <p><span className="font-semibold">Sabor:</span> {state.flavourId}</p>
        //         <p><span className="font-semibold">Granos:</span> {state.coffeeBeansId}</p>
        //     </div>

        //     {state.toppings && (
        //         <div className="mb-6">
        //             <h2 className="text-xl font-semibold mb-2">Toppings:</h2>
        //             <ul className="space-y-1">
        //                 {Object.entries(state.toppings).map(([id, quantity]) => {
        //                     if (quantity === 0) return null;
        //                     const toppingName = TOPPING_NAMES[Number(id)];
        //                     return (
        //                         <li key={id} className="flex justify-between">
        //                             <span>{toppingName}</span>
        //                             <span>{String(quantity)}</span>
        //                         </li>
        //                     );
        //                 })}
        //             </ul>
        //         </div>
        //     )}

        <div>
            <div className="flex flex-col items-center justify-center h-screen text-center p-4 gap-4">
            <h2 className="text-4xl font-bold">¡Tu pedido con numero #{orderNumber} se ha enviado!</h2>
            <p className="text-3xl text-gray-800 mt-2">El total de tu compra es de <strong>$39.00 MXN</strong> pesos.</p>
            
            <div className="mt-4 bg-[#FAF9F6] p-4 rounded-2xl shadow-lg">
                <img
                src="https://img.freepik.com/vector-premium/dibujo-dibujos-animados-cajero_29937-8124.jpg?w=1380"
                alt="Cajero"
                className="size-52 mx-auto"
                />
            </div>
            <p className="mt-4 text-4xl font-bold">Pase a ventanilla</p>
            </div>
        </div>
    );
};

export default OrderConfirmation;