import React, { useState } from "react";
import { createTopping, ToppingCreate } from "../../../services/toppingsServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

const ToppingsForm: React.FC = () => {
  const [formData, setFormData] = useState<ToppingCreate>({
    name: "",
    price: 0,
    image: null,
    free_quantity: 0,
    max_quantity: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const toppingData = new FormData();
    toppingData.append("name", formData.name);
    toppingData.append("price", formData.price.toString());
    toppingData.append("free_quantity", formData.free_quantity.toString());
    toppingData.append("max_quantity", formData.max_quantity.toString());
    if (formData.image) {
      toppingData.append("image", formData.image);
    }
    console.log("📦 FormData contents:");
    for (let [key, value] of toppingData.entries()) {
      console.log(`${key}:`, value);
    }
    mutation.mutate(toppingData); // Llama a la mutación con los datos del formulario
  };

  const mutation = useMutation({
    mutationFn: createTopping,
    onSuccess: (data) => {
      console.log("Producto creado:", data);
      setFormData({ name: "", price: 0, free_quantity:0, max_quantity:0, image: null }); // limpia el form
      alert("Producto creado con éxito ✅"); // o usa un toast
    },
    onError: (error) => {
      console.error("Error al crear el producto:", error);
      alert("Error al guardar 😢");
    },
  });

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
    } else if (currentPath.includes("/productos")) {
      navigate("/productos/");
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
        <div>
          <label className="block text-gray-700 font-medium">Cantidad gratuita de toppings</label>
          <input
            type="number"
            name="free_quantity"
            value={formData.free_quantity}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Cantidad máxima de toppings</label>
          <input
            type="number"
            name="max_quantity"
            value={formData.max_quantity}
            onChange={handleChange}
            required
            min={1}
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

export default ToppingsForm;
