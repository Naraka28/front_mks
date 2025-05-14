import React, { useState } from "react";
import MultiSelectDropDown from "../auxiliaryComponents/MultiSelectDropDown";
import { useQuery } from "@tanstack/react-query";
import { getToppings } from "../../../services/toppingsServices";
import { getSizes } from "../../../services/sizeServices";
import { getFlavors } from "../../../services/flavorServices";
import { getMilks } from "../../../services/milksServices";
import {
  getProductTypes,
  ProductCreatePartial,
  createProduct,
} from "../../../services/productsServices";
import { useNavigate, useLocation } from "react-router-dom";

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductCreatePartial>({
    name: "",
    base_price: 0,
    image: null,
    type: "",
    toppings: [],
    sizes: [],
    flavors: [],
    milks: [],
    temp: [],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name === "productName"
        ? "name"
        : name === "basePrice"
        ? "base_price"
        : name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleMultiSelectChange = (
    field: keyof ProductCreatePartial,
    selected: number[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name || "");
    data.append(
      "base_price",
      formData.base_price?.toString() || "0"
    );
    data.append("type", formData.type?.toString() || "");

    if (formData.image) data.append("image", formData.image);

    const appendIds = (key: string, array?: number[]) => {
      if (Array.isArray(array)) {
        array.forEach((id) => {
          if (typeof id === "number") data.append(key, id.toString());
        });
      }
    };

    appendIds("toppings", formData.toppings);
    appendIds("sizes", formData.sizes);
    appendIds("flavours", formData.flavors); // correcto nombre para backend
    appendIds("milks", formData.milks);
    appendIds("temp", formData.temp);

    // 🔍 DEBUG
    console.log("Formulario enviado:");
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await createProduct(data);
      navigate("/productos/");
    } catch (error: any) {
      const msg =
        (await error?.response?.text?.()) || error.message || "Error desconocido";
      console.error("Error al guardar producto:", msg);
    }
  };

  const { data: toppingsList = [], isLoading: loadingToppings } =
    useQuery({ queryKey: ["toppings"], queryFn: getToppings });
  const { data: sizes = [], isLoading: loadingSizes } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });
  const { data: flavors = [], isLoading: loadingFlavors } = useQuery({
    queryKey: ["flavors"],
    queryFn: getFlavors,
  });
  const { data: milks = [], isLoading: loadingMilks } = useQuery({
    queryKey: ["milks"],
    queryFn: getMilks,
  });
  const { data: productTypes = [], isLoading: loadingTypes } = useQuery({
    queryKey: ["productTypes"],
    queryFn: getProductTypes,
  });

  if (
    loadingToppings ||
    loadingSizes ||
    loadingFlavors ||
    loadingMilks ||
    loadingTypes
  ) {
    return <div>Loading...</div>;
  }

  const productTypesOptions = productTypes.map((type) => ({
    label: type.type,
    value: type.id,
  }));
  const sizesOptions = sizes.map((s) => ({ label: s.name, value: s.id }));
  const flavorsOptions = flavors.map((f) => ({
    label: f.name,
    value: f.id,
  }));
  const milksOptions = milks.map((m) => ({ label: m.name, value: m.id }));
  const toppingsOptions = toppingsList.map((t) => ({
    label: t.name,
    value: t.id,
  }));

  const handleAddClick = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("/sabores")) navigate("/sabores/");
    else if (currentPath.includes("/tamanos")) navigate("/tamanos/");
    else if (currentPath.includes("/leches")) navigate("/leches/");
    else if (currentPath.includes("/toppings")) navigate("/toppings/");
    else if (currentPath.includes("/productos")) navigate("/productos/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-end">
        <button
          onClick={handleAddClick}
          className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
        ></button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Agregar Producto
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="productName"
            value={formData.name}
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
            value={formData.base_price}
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
          <label className="block text-gray-700 font-medium">
            Tipo de Producto
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          >
            <option value="">Selecciona un tipo</option>
            {productTypesOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Toppings</label>
          <MultiSelectDropDown
            content={toppingsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("toppings", selected)
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Tamaños</label>
          <MultiSelectDropDown
            content={sizesOptions}
            onChange={(selected) => handleMultiSelectChange("sizes", selected)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Sabores</label>
          <MultiSelectDropDown
            content={flavorsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("flavors", selected)
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Leches</label>
          <MultiSelectDropDown
            content={milksOptions}
            onChange={(selected) => handleMultiSelectChange("milks", selected)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Temperaturas</label>
          <MultiSelectDropDown
            content={[
              { label: "Frío", value: 3 },
              { label: "Caliente", value: 4 },
            ]}
            onChange={(selected) => handleMultiSelectChange("temp", selected)}
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

export default ProductForm;
