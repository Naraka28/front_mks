import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import {
  createMilk,
  getMilkById,
  updateMilk,
  MilkCreate,
  MilkUpdate,
} from "../../../services/milksServices";

const MilksForm: React.FC = () => {
  const [formData, setFormData] = useState<MilkCreate>({
    name: "",
    price: 0,
    image: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Obtener datos si estamos en edición
  const { data: existingMilk, isLoading } = useQuery({
    queryKey: ["milk", id],
    queryFn: () => getMilkById(Number(id)),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingMilk) {
      setFormData({
        name: existingMilk.name,
        price: existingMilk.price,
        image: null, // no precargamos la imagen
      });
    }
  }, [existingMilk]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const createMutation = useMutation({
    mutationFn: createMilk,
    onSuccess: () => {
      alert("Leche creada con éxito ✅");
      setFormData({ name: "", price: 0, image: null });
      navigate("/leches");
    },
    onError: (error) => {
      console.error("Error al crear la leche:", error);
      alert("Error al guardar 😢");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMilk,
    onSuccess: () => {
      alert("Leche actualizada correctamente ✅");
      navigate("/leches");
    },
    onError: (error) => {
      console.error("Error al actualizar leche:", error);
      alert("Error al actualizar 😢");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      const updateData: MilkUpdate = {
        id: Number(id),
        name: formData.name,
        price: formData.price,
        // no enviamos imagen en update
      };
      updateMutation.mutate(updateData);
    } else {
      const milkData = new FormData();
      milkData.append("name", formData.name);
      milkData.append("price", formData.price.toString());
      if (formData.image) {
        milkData.append("image", formData.image);
      }
      createMutation.mutate(milkData);
    }
  };

  const handleBack = () => {
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

  if (isEditing && isLoading) return <div className="flex mt-32 items-center justify-center w-full h-full"><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1}/></div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
        ></button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {isEditing ? "Editar Leche" : "Agregar Leche"}
      </h2>
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
          {isEditing ? "Actualizar Producto" : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
};

export default MilksForm;
