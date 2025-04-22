import React, { useState } from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiTag, FiChevronDown } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { useTickets, Ticket } from '../CashierData/useTickets';

export const CashierRouteSelect: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const tickets: Ticket[] = useTickets();

  const pendingTickets = tickets.filter(ticket => ticket.status === 'pending');

  return (
    <div className="space-y-1">
      {/* Dropdown para órdenes pendientes */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between w-full rounded px-2 py-1.5 text-sm transition-colors ${location.pathname.startsWith("/cashier") &&
              !location.pathname.startsWith("/cashier/completados")
              ? "bg-white text-stone-950 shadow"
              : "hover:bg-stone-200 text-stone-500"
            }`}
        >
          <div className="flex items-center gap-2">
            <FiDollarSign />
            <span>Tickets Pendientes</span>
          </div>
          <FiChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {isDropdownOpen && (
          <div className="ml-6 mt-1 space-y-1">
            <Link
              to="/cashier"
              className="block px-2 py-1.5 text-sm rounded hover:bg-stone-100 text-stone-600"
            >
              Ver todos
            </Link>

            {pendingTickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/cashier/${ticket.id}`}
                className="flex items-center justify-between px-2 py-1.5 text-sm rounded hover:bg-stone-100 text-stone-600"
              >
                <span className="text-xs">Ticket #{ticket.id}</span>
                <span className="text-xs text-stone-400">
                  {new Date(ticket.ticket_date).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Route
        Icon={FiTag}
        selected={location.pathname === "/cashier/completados"}
        title="Historial de Tickets"
        path="/cashier/completados"
      />
    </div>
  );
};


interface RouteProps {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}

const Route: React.FC<RouteProps> = ({ selected, Icon, title, path }) => (
  <Link to={path}>
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
    >
      <Icon className={selected ? "text-violet-800" : ""} />
      <span>{title}</span>
    </button>
  </Link>
);

export default CashierRouteSelect;
