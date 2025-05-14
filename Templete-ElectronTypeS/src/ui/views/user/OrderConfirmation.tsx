import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber, total } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/userhome");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen text-center p-4 gap-4">
                <h2 className="text-4xl font-bold">
                    ¡Tu pedido con numero #{orderNumber ?? "N/A"} se ha enviado!
                </h2>
                <p className="text-3xl text-gray-800 mt-2">
                    El total de tu compra es de <strong>${total ?? "0.00"} MXN</strong> pesos.
                </p>
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