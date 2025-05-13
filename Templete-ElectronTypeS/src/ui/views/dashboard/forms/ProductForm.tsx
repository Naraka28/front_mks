import React, { useState } from "react";
import MultiSelectDropDown from "../auxiliaryComponents/MultiSelectDropDown";
import { useQuery } from "@tanstack/react-query";
import { getToppings } from "../../../services/toppingsServices";
import { getSizes } from "../../../services/sizeServices";
import { getFlavors } from "../../../services/flavorServices";
import { getMilks } from "../../../services/milksServices";
import { getProductTypes, ProductCreate, ProductCreatePartial } from "../../../services/productsServices";

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<ProductCreatePartial>({
        name: "",
        base_price: 0,
        image: null,
        type: "",
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

  const { data: toppingsList =[], isLoading:loadingToppings, error:errorTopping } = useQuery({
    queryKey: ["toppings"],
    queryFn: ()=> getToppings(),   
});

const { data: sizes =[], isLoading: loadingSizes, error:errorSizes } = useQuery({
  queryKey: ["sizes"],
  queryFn: ()=> getSizes(),   
});

const { data: flavors =[], isLoading: loadingFlavors, error:errorFlavors } = useQuery({
  queryKey: ["flavors"],
  queryFn: ()=> getFlavors(),   
});

const { data: milks =[], isLoading: loadingMilks, error:errorMilks } = useQuery({
  queryKey: ["milks"],
  queryFn: ()=> getMilks(),   
});

const { data: productTypes =[], isLoading: loadingTypes, error:errorTypes } = useQuery({
  queryKey: ["productTypes"],
  queryFn: ()=> getProductTypes(),   
});




  if (loadingToppings || loadingSizes || loadingFlavors || loadingMilks || loadingTypes) {
    return <div>Loading...</div>;
  }
  if (errorTopping || errorSizes || errorFlavors || errorMilks || errorTypes) {
    console.error("Error fetching data:", errorTopping || errorSizes || errorFlavors || errorMilks || errorTypes);
    return <div>Error loading data</div>;
  }
  

  const productTypesOptions = productTypes.map(element => {
    return { label: element.type, value: element.id };
  });

  const sizesOptions = sizes.map(element => {
    return { label: element.name, value: element.id };
    
  });
  const flavorsOptions = flavors.map(element => {
    return { label: element.name, value: element.id };
    
  });
  const milksOptions = milks.map(element => {
    return { label: element.name, value: element.id };
    
  });
  const toppingsOptions = toppingsList.map(element => {
    return { label: element.name, value: element.id };
    
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nombre del Producto</label>
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
          <label className="block text-gray-700 font-medium ">Imagen</label>
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
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none transition"
          >{
            productTypesOptions.map((type) => (

              <option key={type.value} value={type.value}>
                {type.label} 
              </option>
            ))}
          
           
          </select>
        </div>
        <div>
          {/* topings */}
          {/* set data variable onChange */}
          <label className="block text-gray-700 font-medium">Toppings</label>
          <MultiSelectDropDown content={toppingsOptions} onChange={setFormData} />
        </div>
        <div>
          {/* sizes */}
          {/* set data variable onChange */}
          <label className="block text-gray-700 font-medium">Tamaños</label>
          <MultiSelectDropDown content={sizesOptions} onChange={setFormData} />
        </div>
        <div>
          <MultiSelectDropDown content={flavorsOptions} onChange={setFormData} />
        </div>
        <div>
          <MultiSelectDropDown content={milksOptions} onChange={setFormData} />
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