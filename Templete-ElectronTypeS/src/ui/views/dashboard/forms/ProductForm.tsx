import React, { useState } from "react";
import MultiSelectDropDown from "../auxiliaryComponents/MultiSelectDropDown";

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<{
        productName: string;
        basePrice: string;
        image: File | null;
        productTypeId: string;
      }>({
        productName: "",
        basePrice: "",
        image: null,
        productTypeId: "1",
      });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const toppings = [
    { label: "Cinammon", value: "cinammon" },
    { label: "Chocolate", value: "chocolate" },
    { label: "Vanilla", value: "vanilla" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Mint", value: "mint" },
    { label: "Caramel", value: "caramel" }
  ];

  const sizes = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" }
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nombre del Producto</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Precio Base</label>
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
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
          <label className="block text-gray-700 font-medium">Tipo de Producto</label>
          <select
            name="productTypeId"
            value={formData.productTypeId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          >
            <option value="1">Bebida</option>
            <option value="2">Comida</option>
          </select>
        </div>
        <div>
           {/* topings */}
          <MultiSelectDropDown content={toppings} />
        </div>
        <div>
          {/* sizes */}
          <MultiSelectDropDown content={sizes} />
        </div>
        <div>
          <MultiSelectDropDown content={toppings} />
        </div>
        <div>
          <MultiSelectDropDown content={toppings} />
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

export default ProductForm;