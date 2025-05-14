import React from "react";
import Button from "../auxiliaryComponents/ButtonCard.tsx";
import {useQuery} from "@tanstack/react-query";
import { getAllowedSizes } from "../../../services/productsServices.ts";
import { SyncLoader } from "react-spinners";

interface SizesProps {
    onSelectSize: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan los tamaños
}

const Sizes: React.FC<SizesProps> = ({ productId, onSelectSize }) => {

    const { data: sizeOptions, isLoading, error } = useQuery({
           queryKey: ["sizes", productId], // Incluye productId para evitar datos en caché incorrectos
           queryFn: () => getAllowedSizes(productId),   
       });
    
        if (isLoading) return <div className='flex mt-32 items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1}/></div>;
        if (error) return <p>Error loading sizes</p>;
    


    // Filtramos solo los items de tipo 'size' por si acaso
  
    return (
        <div className="grid grid-cols-2  md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-4 font-[Poppins]">
            {sizeOptions?.map((size) => (
                <Button
                    key={size.id}
                    text={size.name}
                    price={size.price}
                    imageSrc={size.image}
                    altText={`${size.name} size`}
                    onClick={() => onSelectSize(size.id)}
                />
            ))}
        </div>
    );
};

export default Sizes;