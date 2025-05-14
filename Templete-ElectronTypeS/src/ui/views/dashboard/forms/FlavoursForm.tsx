import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFlavor,
  updateFlavor,
  getFlavorById,
  FlavorCreate,
} from "../../../services/flavorServices";

const FlavoursForm: React.FC = () => {
  const [formData, setFormData] = useState<FlavorCreate>({
    name: "",
    price: 0,
    image: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(id);

  // Fetch data si estás editando
  const { data: existingFlavor, isLoading } = useQuery({
    queryKey: ["flavor", id],
    queryFn: () => getFlavorById(Number(id)),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingFlavor) {
      setFormData({
        name: existingFlavor.name,
        price: existingFlavor.price,
        image: null, // Imagen no se carga por seguridad del navegador
      });
    }
  }, [existingFlavor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const createMutation = useMutation({
    mutationFn: createFlavor,
    onSuccess: () => {
      alert("Sabor creado exitosamente");
      navigate("/sabores");
    },
    onError: () => {
      alert("Error al crear el sabor");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; price: number } }) =>
      updateFlavor({ id, data }),
    onSuccess: () => {
      alert("Sabor actualizado exitosamente");
      navigate("/sabores");
    },
    onError: () => {
      alert("Error al actualizar el sabor");
    },
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isEditing) {
      updateMutation.mutate({
        id: Number(id),
        data: {
          name: formData.name,
          price: formData.price,
        },
      });
    } else {
      const flavorData = new FormData();
      flavorData.append("name", formData.name);
      flavorData.append("price", formData.price.toString());
      if (formData.image) {
        flavorData.append("image", formData.image);
      }
      createMutation.mutate(flavorData);
    }
  };
  

  const handleBack = () => {
    navigate("/sabores");
  };

  if (isEditing && isLoading) {
    return <p className="text-center">Cargando sabor...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
        ></button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {isEditing ? "Editar Sabor" : "Agregar Sabor"}
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
          {isEditing ? "Actualizar Sabor" : "Guardar Sabor"}
        </button>
      </form>
    </div>
  );
};

export default FlavoursForm;
