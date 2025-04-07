import { getAllowedTemps } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";

import { useQuery } from "@tanstack/react-query";

interface TemperatureProps {
    onSelectTemp: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan las temperaturas
}

const Temperature: React.FC<TemperatureProps> = ({ onSelectTemp, productId }) => {

          const { data: tempsOptions, isLoading, error } = useQuery({
                queryKey: ["flavors", productId], // Incluye productId para evitar datos en caché incorrectos
                queryFn: () => getAllowedTemps(productId),   
            });
        
            if (isLoading) return <p>Loading temps...</p>;
            if (error) return <p>Error loading temps</p>;
        
    


    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {tempsOptions?.map(temp => (
                <Button
                    key={temp.id}
                    text={temp.name}
                    imageSrc={temp.image}
                    altText={`${temp.name} temperature`}
                    onClick={() => onSelectTemp(temp.id)}
                />
            ))}
        </div>
    );
};

export default Temperature;