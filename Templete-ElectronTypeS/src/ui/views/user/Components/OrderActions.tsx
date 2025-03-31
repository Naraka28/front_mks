import ButtonCard from '../auxiliaryComponents/ButtonCard';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface OrderActionsProps {
    itemId: string | undefined;
    sizeId: string;
    flavourId: string;
    coffeeBeansId: string;
    toppings: Record<number, number>;
}



const OrderActions: React.FC<OrderActionsProps> = ({ itemId, sizeId, flavourId, coffeeBeansId, toppings }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderDetails = location.state || {
        itemId: itemId,
        sizeId: sizeId,
        flavourId: flavourId,
        coffeeBeansId: coffeeBeansId,
        toppings: toppings
    };

    const handleAddAnotherProduct = () => {
        navigate("/menu");
    };

    const handleSendOrder = () => {
        navigate("/order/confirm", { state: orderDetails }); 
    };

    return (
        <>
            <div>
                <div className="grid grid-cols-2 gap-4 p-4 font-[Poppins]">
                    <ButtonCard
                        text="Agregar otro producto"
                        imageSrc={""}
                        altText="Agregar otro producto"
                        onClick={handleAddAnotherProduct}
                    />
                    <ButtonCard
                        text="Enviar Orden"
                        imageSrc={""}
                        altText="Enviar Orden"
                        onClick={handleSendOrder}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderActions;