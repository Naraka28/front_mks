import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { FaEye } from 'react-icons/fa6';

const Modal = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10 ">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="bg-black bg-opacity-45 fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white border-4 border-gray-300 p-3 rounded-lg shadow-2xl max-w-lg w-full">
          <div className="flex justify-end text-purple-600">
            <button onClick={onClose} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out">

            </button>
          </div>
          <DialogTitle className="text-4xl font-bold text-center">Detalles del Producto</DialogTitle>
          <div className="flex items-center justify-center mt-2 border-t-2 border-gray-200 pt-1">
            <div className="p-3 mr-4 bg-purple-100 rounded-full">
              <ListBulletIcon className="w-10 h-10 text-purple-600" />
            </div>
            <div className="p-2 gap-1">
              <p className="text-xl text-gray-700"><strong>Producto:</strong> {product.product}</p>
              <p className="text-xl text-gray-700"><strong>Proveedor:</strong> {product.provider.name}</p>
              <p className="text-xl text-gray-700"><strong>Stock:</strong> {product.stock}</p>
              <p className="text-xl text-gray-700"><strong>Último restock:</strong> {product.lastVisit}</p>
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

  const products = [
    {
      product: 'Granos de Café',
      provider: { name: 'John Michael', email: 'john@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' },
      stock: 618,
      lastVisit: '23/04/18',
      image: '',
    },
    {
      product: 'Leche deslactosada',
      provider: { name: 'Alexa Liras', email: 'alexa@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg' },
      stock: 432,
      lastVisit: '23/04/18',
      image: '',
    },
    {
      product: 'Galletas',
      provider: { name: 'Laurent Perrier', email: 'laurent@creative-tim.com', img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg' },
      stock: 819,
      lastVisit: '19/09/17',
      image: '',
    },
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {['Producto', 'Proveedor', 'Stock', 'Último Restock', 'Acciones'].map((header) => (
              <th
                key={header}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  {header}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((row, index) => (
            <tr key={index}>
              <td className="p-4 border-b border-blue-gray-50">{row.product}</td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <img src={row.provider.img} alt={row.provider.name} className="inline-block object-cover rounded-full w-9 h-9" />
                  <div>
                    <p className="text-sm text-blue-gray-900 font-normal">{row.provider.name}</p>
                    <p className="text-sm text-blue-gray-900 font-normal opacity-70">{row.provider.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">{row.stock}</td>
              <td className="p-4 border-b border-blue-gray-50">{row.lastVisit}</td>
              <td className="p-4 border-b border-blue-gray-50">
                <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </span>
                </button>
                <button onClick={() => openModal(row)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 h-10 rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30">
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