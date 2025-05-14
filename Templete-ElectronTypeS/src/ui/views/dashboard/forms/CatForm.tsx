import React, { useState } from "react";
import { createMilk } from "../../../services/milksServices";
import { useNavigate, useLocation } from "react-router-dom";


const CatForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    image: File | null;
  }>({
    name: "",
    price: "",
    image: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const milkData = {
        name: formData.name,
        price: parseFloat(formData.price),
        image: null,
        // imagen no incluida aún
      };
  
      const created = await createMilk(milkData);
      console.log("Producto creado:", created);
  
      // Limpia el formulario si quieres
      setFormData({
        name: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  
  const handleAddClick = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("/sabores")) {
      navigate("/sabores/");
    } else if (currentPath.includes("/tamanos")) {
      navigate("/tamanos/");
    } else if (currentPath.includes("/leches")) {
      navigate("/leches/");
    } else if (currentPath.includes("/toppings")) {
      navigate("/toppings/");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-end">
        <button onClick={handleAddClick} className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"></button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Imagen</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
};

export default CatForm;
