import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaEye } from 'react-icons/fa6';
import { IoTrashSharp } from 'react-icons/io5';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFlavor, getFlavors } from '../../../services/flavorServices';
import { Link } from "react-router-dom";
import { SyncLoader } from 'react-spinners';

const ModalDetails = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl w-[42rem] overflow-y-auto">
          <div className="flex justify-end text-purple-600">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"></button>
          </div>
          <div className="flex justify-center items-center p-2">
            <ListBulletIcon className="mr-4 mt-1 w-10 h-10 text-purple-600" />
            <DialogTitle className="text-4xl font-bold text-center">Detalles del Sabor</DialogTitle>
          </div>
          <div className="flex items-center justify-center border-t-2 border-gray-200 pt-4 mb-6">
            <div className="p-2 mr-10 bg-purple-100 rounded-full">
              <img src={product.image} alt="" height="200" width="200" />
            </div>
            <div className="gap-1 mt-4">
              <p className="text-xl text-gray-700"><strong>Nombre:</strong> {product.name}</p>
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
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl w-[38rem] overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200"></button>
          </div>
          <div className="flex justify-center items-center mr-10 mb-4">
            <IoTrashSharp className="mr-4 mt-1 w-10 h-10 text-purple-600" />
            <DialogTitle className="text-4xl font-bold text-center">Confirmar eliminación</DialogTitle>
          </div>
          <div className="text-center mb-4">
            <p className="text-xl text-gray-700 mb-2">¿Estás seguro que deseas eliminar este sabor?</p>
            <p className="text-2xl font-bold text-gray-800">"{product.name}"</p>
            <div className="p-2 bg-purple-100 flex justify-center items-center rounded-full mt-2">
              <img src={product.image} alt="" className="max-w-full h-auto object-contain max-h-60 rounded-md"/>
            </div>
            <p className="text-xl text-red-600 font-semibold mt-4">Esta acción no se puede deshacer</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={onClose} className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200">
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

const FlavorsTable = () => {
  const queryClient = useQueryClient();
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: flavors = [], isLoading, error } = useQuery({
    queryKey: ['flavors'],
    queryFn: getFlavors,
  });

  const openDetailsModal = (flavor) => {
    setSelectedFlavor(flavor);
    setIsModalDetailsOpen(true);
  };

  const openDeleteModal = (flavor) => {
    setSelectedFlavor(flavor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteFlavor = async (flavorId: string) => {
    try {
      await deleteFlavor(flavorId);
      queryClient.invalidateQueries(['flavors']);
    } catch (err) {
      console.error("Error al eliminar el Sabor:", err);
    }
  };

  if (isLoading) return <div className='flex mt-32 items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1}/></div>;
  if (error) return <div>Error al cargar sabores: {error.message}</div>;

  return (
    <div className="p-6 overflow-scroll">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {['Nombre', 'Imagen', 'Precio', 'Acciones'].map((header) => (
              <th key={header} className="border-y border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-800">{header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flavors.map((flavor) => (
            <tr key={flavor.id}>
              <td className="p-4 border-b border-gray-100">{flavor.name}</td>
              <td className="p-4 border-b border-gray-100">
                <img src={flavor.image || '/placeholder.png'} alt="Imagen del sabor" className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="p-4 border-b border-gray-100">${flavor.price}</td>
              <td className="p-4 border-b border-gray-100 space-x-3">
              <Link to={`/sabores/editar-sabor/${flavor.id}`}>
                <button type="button">
                  <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </span>
                </button>
              </Link>
                <button onClick={() => openDetailsModal(flavor)}>
                  <FaEye />
                </button>
                <button onClick={() => openDeleteModal(flavor)}>
                  <IoTrashSharp />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalDetails
        open={isModalDetailsOpen}
        onClose={() => setIsModalDetailsOpen(false)}
        product={selectedFlavor}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={selectedFlavor}
        onConfirm={handleDeleteFlavor}
      />
    </div>
  );
};

export default FlavorsTable;
