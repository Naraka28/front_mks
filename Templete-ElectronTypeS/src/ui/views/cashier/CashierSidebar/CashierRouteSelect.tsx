import React, { useState } from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiTag, FiChevronDown, FiClock, FiList } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { getPendingTickets} from './../../../services/cashierServives';
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";

export const CashierRouteSelect: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const TicketsPending = useQuery({
    queryKey: ["ticketsPending"],
    queryFn: getPendingTickets, 
  });

  const formatTime = (timeString: string) => {
    const [timePart] = timeString.split('.');
    const [hours, minutes] = timePart.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="space-y-1.5 p-2">
      {/* Dropdown para órdenes pendientes */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-300
            ${location.pathname.startsWith("/cashier") && !location.pathname.startsWith("/cashier/completados")
              ? "bg-violet-50 border-2 border-violet-200 text-violet-900 shadow-sm hover:border-violet-300"
              : "hover:bg-stone-50 text-stone-600 hover:text-stone-800 border-2 border-transparent"
            } group focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400`}
        >
          <div className="flex items-center gap-2">
            <FiDollarSign className="shrink-0 text-violet-600 group-hover:text-violet-700" />
            <span className="font-medium">Tickets Pendientes</span>
          </div>
          <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} 
            text-stone-400 group-hover:text-stone-500`} />
        </button>

        {isDropdownOpen && (
          <div className="ml-4 mt-1.5 space-y-1.5 border-l-2 border-stone-200 pl-3">
            <Link
              to="/cashier"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white hover:bg-violet-50 
                text-stone-600 hover:text-violet-700 transition-colors duration-200 border border-stone-100 
                hover:border-violet-200 shadow-sm"
            >
              <FiList className="text-violet-500" />
              Ver todos
            </Link>

            {TicketsPending.isLoading ? (
              <div className="flex items-center justify-center px-3 py-2 text-sm text-stone-500">
                <SyncLoader color="#5d1abc" margin={8} size={12} speedMultiplier={1} />
              </div>
            ) : TicketsPending.error ? (
              <div className="px-3 py-2 text-sm text-red-500">
                {TicketsPending.error.message}
              </div>
            ) : (
              Array.isArray(TicketsPending.data) && TicketsPending.data.map((ticket) => (
                <Link
                  key={ticket.id}
                  to={`/cashier/${ticket.id}`}
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-lg bg-white
        hover:bg-violet-50 text-stone-600 transition-all duration-200 border border-stone-100
        hover:border-violet-200 shadow-sm group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-700 group-hover:text-violet-600">
                      Ticket #{ticket.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400 group-hover:text-stone-600">
                    <FiClock className="shrink-0" />
                    <span className="text-xs">
                      {formatTime(ticket.ticket_time)}
                    </span>
                  </div>
                </Link>
              ))
            )}

          </div>
        )}
      </div>

      <Route
        Icon={FiTag}
        selected={location.pathname === "/cashier/completados"}
        title="Tickets completados"
        path="/cashier/completados"
      />

      <Route
        Icon={FiTag}
        selected={location.pathname === "/cashier/cancelados"}
        title="Tickets cancelados"
        path="/cashier/cancelados"
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
  <Link
    to={path}
    className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-300
      ${selected
        ? "bg-violet-50 border-2 border-violet-200 text-violet-900 shadow-sm hover:border-violet-300"
        : "hover:bg-stone-50 text-stone-600 hover:text-stone-800 border-2 border-transparent"
      } focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 group`}
    role="button"
  >
    <Icon className={`shrink-0 ${selected ? "text-violet-600" : "text-stone-500 group-hover:text-violet-500"}`} />
    <span className="font-medium">{title}</span>
  </Link>
);

export default CashierRouteSelect;