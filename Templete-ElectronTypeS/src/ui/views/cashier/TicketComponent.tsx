import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketsResponse } from './../../services/cashierServives';

interface TicketProps {
    ticket: TicketsResponse;
}

const TicketComponent: React.FC<TicketProps> = ({ ticket }) => {
    const navigate = useNavigate();
    const isPending = ticket.status === 'Pendiente';

    const formatTime = (timeString: string) => {
        const [timePart] = timeString.split('.');
        const [hours, minutes] = timePart.split(':');
        return `${hours}:${minutes}`;
    };

    const getStatusColor = () => {
        return isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
    };

    return (
        <div
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-stone-100 cursor-pointer"
            onClick={() => navigate(isPending ? `/cashier/${ticket.id}` : `/cashier/completados/${ticket.id}`)}
        >
            {/* Encabezado del ticket */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-base font-semibold">Ticket #{ticket.id}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
                        {isPending ? 'Pendiente' : 'Completado'}
                    </span>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">{ticket.ticket_date}</p>
                    <p className="text-sm text-gray-500">
                        {formatTime(ticket.ticket_time)}
                    </p>
                </div>
            </div>

            {/* Información del cajero */}
            <div className="mb-4">
                <p className="text-sm text-stone-600">
                    Cajero: <span className="font-medium">{ticket.cashier.name}</span>
                </p>
                <p className="text-sm text-stone-600">
                    Método de pago: <span className="font-medium">{ticket.payment_method}</span>
                </p>
            </div>

            {/* Detalles de las órdenes */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Órdenes:</h4>
                <ul className="text-sm text-stone-600 space-y-1">
                    {ticket.orders.map((order) => (
                        <li key={order.id} className="flex justify-between">
                            <span>{order.product.name}</span>
                            <span>${order.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t pt-3 mt-4 font-bold text-black">
                <span>Total:</span>
                <span>${ticket.total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default TicketComponent;