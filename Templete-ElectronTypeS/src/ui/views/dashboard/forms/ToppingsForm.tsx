import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import {
  createTopping,
  getToppingById,
  updateTopping,
  ToppingCreate,
} from "../../../services/toppingsServices";

const ToppingsForm: React.FC = () => {
  const [formData, setFormData] = useState<ToppingCreate>({
    name: "",
    price: 0,
    image: null,
    free_quantity: 0,
    max_quantity: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(id);

  const { data: existingTopping, isLoading } = useQuery({
    queryKey: ["topping", id],
    queryFn: () => getToppingById(Number(id)),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingTopping) {
      setFormData({
        name: existingTopping.name,
        price: existingTopping.price,
        free_quantity: existingTopping.free_quantity,
        max_quantity: existingTopping.max_quantity,
        image: null, // La imagen no se carga por seguridad
      });
    }
  }, [existingTopping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "free_quantity" || name === "max_quantity"
        ? parseFloat(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const createMutation = useMutation({
    mutationFn: createTopping,
    onSuccess: () => {
      alert("Topping creado exitosamente");
      navigate("/toppings");
    },
    onError: () => {
      alert("Error al crear el topping");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<ToppingCreate, "image"> }) =>
      updateTopping({ id, data }),
    onSuccess: () => {
      alert("Topping actualizado exitosamente");
      navigate("/toppings");
    },
    onError: () => {
      alert("Error al actualizar el topping");
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
          free_quantity: formData.free_quantity,
          max_quantity: formData.max_quantity,
        },
      });
    } else {
      const toppingData = new FormData();
      toppingData.append("name", formData.name);
      toppingData.append("price", formData.price.toString());
      toppingData.append("free_quantity", formData.free_quantity.toString());
      toppingData.append("max_quantity", formData.max_quantity.toString());
      if (formData.image) {
        toppingData.append("image", formData.image);
      }
      createMutation.mutate(toppingData);
    }
  };

  const handleBack = () => {
    navigate("/toppings");
  };

  if (isEditing && isLoading) {
    if (isLoading) return <div className='flex mt-32 items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1}/></div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="px-2 py-2 bg-red-700 rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {isEditing ? "Editar Topping" : "Agregar Topping"}
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
          <label className="block text-gray-700 font-medium">Cantidad gratuita</label>
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
          <label className="block text-gray-700 font-medium">Cantidad máxima</label>
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
          {isEditing ? "Actualizar Topping" : "Guardar Topping"}
        </button>
      </form>
    </div>
  );
};

export default ToppingsForm;
