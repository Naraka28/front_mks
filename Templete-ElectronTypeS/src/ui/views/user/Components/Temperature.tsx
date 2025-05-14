import { getAllowedTemps } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";
import { SyncLoader } from "react-spinners";
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

    if (isLoading) return <div className='flex mt-32 items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1} /></div>;
    if (error) return <p>Error loading temps</p>;




    return (
        <div className="grid grid-cols-3 md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-6 p-6">
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