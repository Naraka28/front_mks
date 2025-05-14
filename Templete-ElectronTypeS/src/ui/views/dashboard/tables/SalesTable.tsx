import { useState } from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { FaEye } from 'react-icons/fa6';
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { getTickets } from "../../../services/ticketsServices";
import { TicketsResponse } from "../../../services/cashierServives";


const ModalDetails = ({ open, onClose, sale }) => {
  if (!sale) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl w-[42rem] h-auto overflow-y-auto">
          <div className="flex justify-end text-purple-600">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"></button>
          </div>
          <div className="p-2 mr-10 flex justify-center items-center">
            <ListBulletIcon className="mr-4 mt-1 w-10 h-10 text-purple-600" />
            <DialogTitle className="text-4xl font-bold text-center">Detalles de la venta</DialogTitle>
          </div>
          <div className="flex items-center justify-center border-t-2 border-gray-200 pt-1 mb-6 mt-4">
            <div className="p-2 mr-10 bg-purple-100 rounded-full mt-4">
              <img src={"./../../../src/ui/assets/logo.svg"} alt="" height="200rem" width="200rem" />
            </div>
            <div className="gap-1 mt-4">
              <p className="text-xl text-gray-700"><strong>Numero de venta:</strong> {sale.id}</p>
              <p className="text-xl text-gray-700"><strong>Precio:</strong> ${sale.total}</p>
              <p className="text-xl text-gray-700"><strong>Fecha:</strong> {sale.ticket_date}</p>
              <p className="text-xl text-gray-700"><strong>Hora:</strong> {sale.ticket_time}</p>
              <p className="text-xl text-gray-700"><strong>Metodo de pago:</strong> {sale.payment_method}</p>
              <p className="text-xl text-gray-700"><strong>Estado:</strong> {sale.status}</p>
              <p className="text-xl text-gray-700"><strong>Vendedor:</strong> {sale.cashier?.name}</p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export const SalesTable = () => {
  
  const [isModalDetailsOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const { data: ticketsList = [], isLoading, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  console.log(ticketsList);

  const openModal = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Cargando Tamaños...</div>;
  if (error) return <div>Error al cargar Tamaños: {error.message}</div>;

  return (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="w-full overflow-x-auto px-0">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Sucursal</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Fecha</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Total</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Cuenta</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Estado</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketsList.map((row, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img src="./../../../src/ui/assets/logo.svg" alt="Logo" className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Hermosillo Centro</p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{row.ticket_date}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">${row.total}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                      <img src={`./../../../src/ui/assets/Efectivo.svg`} className="inline-block relative object-center !rounded-none rounded-md h-full w-full" />
                    </div>
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">Efectivo</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${row.status === "Completado" ? "bg-green-500/20 text-green-900" : row.status === "Pendiente" ? "bg-amber-500/20 text-amber-900" : "bg-red-500/20 text-red-900"} py-1 px-2 text-xs rounded-md`}>
                      <span>{row.status}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button onClick={() => openModal(row)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                    <span className="flex items-center justify-center w-full h-full">
                      <FaEye />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDetails
        open={isModalDetailsOpen}
        onClose={() => setIsModalOpen(false)}
        sale={selectedSale}
      />
    </div>
  );
};