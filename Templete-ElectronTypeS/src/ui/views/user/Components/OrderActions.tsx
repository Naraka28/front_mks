import ButtonCard from '../auxiliaryComponents/ButtonCard';
import { useNavigate, useLocation } from "react-router-dom";
import { useOrders } from "../auxiliaryComponents/OrderContext";
import { calculateTotal } from "../auxiliaryComponents/orderUtils";
import { createOrderWithTicket } from "../../../services/ordersServices";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productsServices";
import { getToppings } from "../../../services/toppingsServices";
import { getMilks } from "../../../services/milksServices";
import { getFlavors } from "../../../services/flavorServices";
import { getSizes } from "../../../services/sizeServices";
import checkout from "../../../assets/checkout.svg";
import plus from "../../../assets/plus.png";


interface OrderActionsProps {
    itemId: string | undefined;
    sizeId: string;
    flavourId: string;
    coffeeBeansId: string;
    toppings: Record<number, number>;
    milkId: string;
    tempId: string;
}



const OrderActions: React.FC<OrderActionsProps> = ({ itemId, sizeId, flavourId, coffeeBeansId, toppings }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orders, clearOrders } = useOrders();

    const { data: menuItems = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
    const { data: toppingOptions = [] } = useQuery({ queryKey: ["toppings"], queryFn: getToppings });
    const { data: milksOptions = [] } = useQuery({ queryKey: ["milks"], queryFn: getMilks });
    const { data: flavourOptions = [] } = useQuery({ queryKey: ["flavors"], queryFn: getFlavors });
    const { data: sizeItems = [] } = useQuery({ queryKey: ["sizes"], queryFn: getSizes });

    const handleAddAnotherProduct = () => {
        navigate("/menu");
    };

    const handleSendOrder = async () => {
        try {
            const response = await createOrderWithTicket(orders);
            const total = orders.reduce(
                (sum, order) =>
                    sum +
                    calculateTotal(
                        {
                            itemId: order.productId,
                            milkId: order.milk,
                            sizeId: order.size,
                            flavourId: order.flavour,
                            toppings: Object.fromEntries(
                                (order.toppings || []).map(ot => [ot.id, ot.quantity])
                            ),
                        },
                        menuItems,
                        toppingOptions,
                        milksOptions,
                        flavourOptions,
                        sizeItems
                    ).total,
                0
            );
            navigate("/order/confirm", {
                state: {
                    orderNumber: response.ticketId,
                    total: total.toFixed(2),
                },
            });
            clearOrders();
        } catch (e: any) {
            alert("Error al enviar la orden");
        }
    };

    return (
            <div>
                <div className="grid grid-cols-2 gap-4 p-4 font-[Poppins]">
                    <ButtonCard
                        text="Agregar otro producto"
                        imageSrc={plus}
                        altText="Agregar otro producto"
                        onClick={handleAddAnotherProduct}
                    />
                    <ButtonCard
                        text="Enviar Orden"
                        imageSrc={checkout}
                        altText="Enviar Orden"
                        onClick={handleSendOrder}
                    />
                </div>
            </div>
        
    );
};

export default OrderActions;