import React from 'react';
import { useParams } from 'react-router-dom';
import { useTickets, BodyCashierProps, Ticket } from '../cashier/CashierData/useTickets';
import { UniversalTopBar } from '../dashboard/auxiliaryComponents/UniversalTopBar';
import OrderComponent from './orderComponent';
import TicketComponent from './TicketComponent';

// ... (imports remain the same)

const BodyCashier: React.FC<BodyCashierProps> = ({ orderStatus }) => {
  const { ticketId } = useParams<{ ticketId?: string }>();
  const tickets: Ticket[] = useTickets();

  // Filtrar tickets según estado y parámetro
  const filteredTickets = tickets.filter(ticket => {
    if (orderStatus === 'pending') {
      return ticket.status === 'pending' && (!ticketId || ticket.id.toString() === ticketId);
    }
    return ticket.status === 'completed' && (!ticketId || ticket.id.toString() === ticketId);
  });

  return (
    <div className="bg-white rounded-lg pb-4 shadow min-h-screen">
      <div className="w-full px-4 grid gap-3 grid-cols-12">
        <div className="col-span-12 p-4">
          <UniversalTopBar />
        </div>
        <div className="col-span-12 p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">
              {orderStatus === 'pending'
                ? ticketId ? `Ticket #${ticketId}` : 'Tickets pendientes'
                : ticketId ? `Ticket #${ticketId}` : 'Tickets completados'}
            </p>

          </div>

          <div className={
            orderStatus === 'pending' && !ticketId
              ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-4'
              : 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'
          }>
            {filteredTickets.map(ticket => (
              orderStatus === 'pending' && !ticketId ? (
                <TicketComponent key={ticket.id} ticket={ticket} />
              ) : orderStatus === 'pending' && ticketId ? (
                ticket.orders.map(order => (
                  <OrderComponent key={order.id} order={order} />
                ))
              ) : (
                <TicketComponent key={ticket.id} ticket={ticket} />
              )
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCashier;
