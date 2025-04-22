import React from 'react';
import { menuItems, Ticket, sizeItems, flavourOptions } from './CashierData/useTickets.tsx';

interface TicketProps {
    ticket: Ticket;
}
const TicketComponent: React.FC<TicketProps> = ({ ticket }) => {
    return (
        <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-80 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold">Ticket #{ticket.id}</h3>
                <span className="text-sm text-gray-500">
                    {new Date(ticket.ticket_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <div className="text-sm space-y-3">
                <div className="flex justify-between">
                    <span className="text-stone-600">Método:</span>
                    <span className="font-medium">{ticket.payment_method}</span>
                </div>

                <div>
                    <span className="block text-stone-600 mb-1">Artículos:</span>
                    <div className="space-y-2">
                        {ticket.orders.map(order => {
                            const menuItem = menuItems.find(item => item.id === order.productId);
                            const size = sizeItems.find(size => size.id === order.sizesId)?.name || 'Tamaño desconocido';
                            const flavour = flavourOptions.find(flavour => flavour.id === order.flavoursId)?.name || 'Sabor desconocido';

                            return (
                                <div
                                    key={order.id}
                                    className="bg-stone-50 rounded-lg px-3 py-2 text-xs text-stone-700 border border-stone-200"
                                >
                                    <p className="font-medium">{menuItem ? menuItem.name : `Producto #${order.productId}`}</p>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Tamaño:</span>
                                        <span>{size}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Sabor:</span>
                                        <span>{flavour}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-between border-t pt-3 font-semibold text-stone-700">
                    <span>Total:</span>
                    <span>${ticket.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};


export default TicketComponent;