import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { FaEye } from 'react-icons/fa6';
import { IoTrashSharp } from 'react-icons/io5';
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

const ModalDetails = ({ open, onClose, product }) => {
  if (!product) return null;

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
            <DialogTitle className="text-4xl font-bold text-center">Detalles del Elemento</DialogTitle>
          </div>
          <div className="flex items-center justify-center border-t-2 border-gray-200 pt-1 mb-6 mt-4">
            <div className="p-2 mr-10 bg-purple-100 rounded-full mt-4">
              <img src={product.image} alt="" height="200rem" width="200rem" />
            </div>
            <div className="gap-1 mt-4">
              <p className="text-xl text-gray-700"><strong>Producto:</strong> {product.name}</p>
              <p className="text-xl text-gray-700"><strong>Tipo:</strong> {product.type?.type}</p>
              <p className="text-xl text-gray-700"><strong>Precio Adicional:</strong> ${product.base_price}</p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const DeleteConfirmationModal = ({ open, onClose, product, onConfirm }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl w-[38rem] h-auto overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"></button>
          </div>
          <div className="mr-10 flex justify-center items-center mb-3">
            <IoTrashSharp className="mr-4 mt-1 w-10 h-10 text-purple-600" />
            <DialogTitle className="text-4xl font-bold text-center">Confirmar eliminación</DialogTitle>
          </div>
          <div className="text-center mb-4">
            <p className="text-xl text-gray-700 mb-2">¿Estás seguro que deseas eliminar el elemento?</p>
            <p className="text-2xl font-bold text-gray-800">"{product.name}"</p>
            <div className="p-2 bg-purple-100 items-center justify-center rounded-full mt-2">
              <img src={product.image} alt="" height="100rem" width="100rem" />
            </div>
            <p className="text-xl text-red-600 font-semibold mt-2">Esta acción no se puede deshacer</p>
          </div>
          <div className="flex justify-center gap-4 mt-1 mb-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm(product.id);
                onClose();
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              Eliminar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const InventoryTable = () => {
  const [isModalDetailsOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { pathname } = useLocation();
  const pathKey = pathname.replace('/', '');
  const fetchConfig = fetchFunctions[pathKey];

  const { data: productList = [], isLoading, error } = useQuery({
    queryKey: fetchConfig?.queryKey || ['default'],
    queryFn: fetchConfig?.queryFn || (() => []),
  });

  const handleDeleteProduct = (productId) => {
    // Aquí implementarías la lógica para eliminar el producto
    //deleteProduct(productId).then(() => refetch());
    // Donde refetch sería una función para actualizar la lista de productos
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
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
              <td className="p-4 border-b border-blue-gray-50 items-center space-x-4">
                <button type="button">
                  <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </span>
                </button>
                <button onClick={() => openModal(row)} className="">
                  <span className="">
                    <FaEye />
                  </span>
                </button>
                <button onClick={() => openDeleteModal(row)}>
                  <span className="">
                    <IoTrashSharp />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDetails
        open={isModalDetailsOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
};

export default InventoryTable;