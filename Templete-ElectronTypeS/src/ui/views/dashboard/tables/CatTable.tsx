import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { FaEye } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { getMilks } from '../../../services/milksServices';
import { getToppings } from '../../../services/toppingsServices';
import { getSizes } from '../../../services/sizeServices';
import { getFlavors } from '../../../services/flavorServices';

const fetchFunctions = {
  leches: {
    queryKey: ['milks'],
    queryFn: getMilks,
    label: 'Leches',
  },
  sabores: {
    queryKey: ['flavors'],
    queryFn: getFlavors,
    label: 'Sabores',
  },
  tamanos: {
    queryKey: ['sizes'],
    queryFn: getSizes,
    label: 'Tamaños',
  },
  toppings: {
    queryKey: ['toppings'],
    queryFn: getToppings,
    label: 'Toppings',
  },
};

const Modal = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl w-[42rem] h-auto overflow-y-auto">
          <div className="flex justify-end text-purple-600">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out" />
          </div>
          <div className="p-2 mr-10 flex justify-center items-center">
            <ListBulletIcon className="mr-4 mt-1 w-10 h-10 text-purple-600 " />
            <DialogTitle className="text-4xl font-bold text-center">Detalles del Producto</DialogTitle>
          </div>
          <div className="flex items-center justify-center border-t-2 border-gray-200 pt-1 mb-6 mt-4">
            <div className="p-2 mr-10 bg-purple-100 rounded-full mt-6">
              {product.product?.img && <img src={product.product.img} alt="" height="200" width="200" />}
            </div>
            <div className="gap-1">
              <p className="text-xl text-gray-700"><strong>Producto:</strong> {product.product?.name || product.name}</p>
              <p className="text-xl text-gray-700"><strong>Proveedor:</strong> {product.provider?.name || 'N/A'}</p>
              <p className="text-xl text-gray-700"><strong>Stock:</strong> {product.stock || 'N/A'}</p>
              <p className="text-xl text-gray-700"><strong>Último restock:</strong> {product.lastVisit || 'N/A'}</p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const InventoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { pathname } = useLocation();
  const pathKey = pathname.replace('/', '');
  const fetchConfig = fetchFunctions[pathKey];

  const { data: productList = [], isLoading, error } = useQuery({
    queryKey: fetchConfig?.queryKey || ['default'],
    queryFn: fetchConfig?.queryFn || (() => []),
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!fetchConfig) return <div>Ruta no válida: {pathname}</div>;
  if (isLoading) return <div>Cargando {fetchConfig.label}...</div>;
  if (error) return <div>Error al cargar {fetchConfig.label}: {error.message}</div>;

  return (
    <div className="p-6 overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {['Producto', 'Imagen', 'Precio', 'Acciones'].map((header) => (
              <th key={header} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  {header}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productList.map((row, index) => (
            <tr key={index}>
              <td className="p-4 border-b border-blue-gray-50">{row.name}</td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <img src={row.product?.image || '/placeholder.png'} alt="null img" className="inline-block object-cover rounded-full w-9 h-9" />
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">${row.price}</td>
              <td className="p-4 border-b border-blue-gray-50">
                <button
                  onClick={() => openModal(row)}
                  className="relative align-middle w-10 h-10 rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <FaEye />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

export default InventoryTable;
