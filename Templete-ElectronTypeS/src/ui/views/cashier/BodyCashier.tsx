import React from 'react';
import { useParams } from 'react-router-dom';
import { UniversalTopBar } from './auxiliaryComponents/UniversalTopBar';
import TicketComponent from './TicketComponent';
import OrderComponent from './OrderComponent';
import {
  getPendingTickets,
  getCompletedTickets,
  TicketsResponse,
  Order
} from './../../services/cashierServives';
import { useQuery } from '@tanstack/react-query';

interface BodyCashierProps {
  orderStatus: 'Pendiente' | 'Completado';
}

const BodyCashier: React.FC<BodyCashierProps> = ({ orderStatus }) => {
  const { ticketId } = useParams<{ ticketId?: string }>();

  const { data: ticketsPending, isLoading: isLoadingPending, error: errorPending } = useQuery({
    queryKey: ['ticketsPending'],
    queryFn: getPendingTickets,
    enabled: orderStatus === 'Pendiente',
  });

  const { data: ticketsCompleted, isLoading: isLoadingCompleted, error: errorCompleted } = useQuery({
    queryKey: ['ticketsCompleted'],
    queryFn: getCompletedTickets,
    enabled: orderStatus === 'Completado',
  });

  const isLoading = orderStatus === 'Pendiente' ? isLoadingPending : isLoadingCompleted;
  const error = orderStatus === 'Pendiente' ? errorPending : errorCompleted;
  const tickets = orderStatus === 'Pendiente' ? ticketsPending : ticketsCompleted;

  const ticketsArray = tickets
    ? Array.isArray(tickets)
      ? tickets
      : [tickets]
    : [];

  const filteredTickets = ticketId
    ? ticketsArray.filter((ticket: TicketsResponse) => ticket.id === Number(ticketId))
    : ticketsArray;
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg pb-4 shadow min-h-screen">
        <div className="w-full px-4 grid gap-3 grid-cols-12">
          <div className="col-span-12 p-4">
            <UniversalTopBar />
          </div>
          <div className="col-span-12 p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">
                Cargando tickets...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg pb-4 shadow min-h-screen">
        <div className="w-full px-4 grid gap-3 grid-cols-12">
          <div className="col-span-12 p-4">
            <UniversalTopBar />
          </div>
          <div className="col-span-12 p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">
                {error.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg pb-4 shadow min-h-screen">
      <div className="w-full px-4 grid gap-3 grid-cols-12">
        <div className="col-span-12 p-4">
          <UniversalTopBar />
        </div>
        <div className="col-span-12 p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">
              {ticketId
                ? `Ticket #${ticketId}`
                : orderStatus === 'Pendiente'
                  ? 'Tickets Pendientes'
                  : 'Tickets Completados'}
            </p>
          </div>
          <div>
            {ticketId && filteredTickets.length === 1 ? (
              // Mostrar las órdenes del ticket seleccionado
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets[0].orders.map((order: Order) => (
                  <OrderComponent key={order.id} order={order} />
                ))}
              </div>
            ) : (
              // Mostrar la lista de tickets
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket: TicketsResponse) => (
                  <TicketComponent key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCashier;