import React from 'react';
import { useParams } from 'react-router-dom';
import { useTickets, BodyCashierProps, Ticket } from '../cashier/CashierData/useTickets';
import { UniversalTopBar } from './auxiliaryComponents/UniversalTopBar';
import OrderComponent from './orderComponent';
import TicketComponent from './TicketComponent';


const BodyCashier: React.FC<BodyCashierProps> = ({ orderStatus }) => {
  const { ticketId } = useParams<{ ticketId?: string }>();
  const tickets: Ticket[] = useTickets();

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
            {orderStatus === 'pending' && ticketId && (
              <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl 
      font-semibold shadow-md hover:shadow-lg transition-all duration-300 
      transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
      focus:ring-red-300 focus:ring-offset-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Cancelar Ticket
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl 
      font-semibold shadow-md hover:shadow-lg transition-all duration-300 
      transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
      focus:ring-green-300 focus:ring-offset-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pagar Ticket
                </button>
              </div>
            )}

          </div>

          <div className={
            orderStatus === 'pending' && !ticketId
              ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-4'
              : 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'
          }>
            {filteredTickets.map(ticket => (
              orderStatus === 'pending' && !ticketId ? (
                <TicketComponent key={ticket.id} ticket={ticket} />

              ) : ticketId ? (
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
