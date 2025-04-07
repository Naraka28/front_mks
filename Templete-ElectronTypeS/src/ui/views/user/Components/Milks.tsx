import { getAllowedMilks } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";
import { useQuery } from "@tanstack/react-query";



interface MilksProps {
    onSelectMilk: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan los sabores

}

const Milks: React.FC<MilksProps> = ({ onSelectMilk, productId }) => {

       const { data: milksOptions, isLoading, error } = useQuery({
             queryKey: ["milks", productId], // Incluye productId para evitar datos en caché incorrectos
             queryFn: () => getAllowedMilks(productId),   
         });
    
        if (isLoading) return <p>Loading Milks...</p>;
        if (error) return <p>Error loading milks</p>;
    


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {milksOptions?.map(milks => (
            <Button
            key={milks.id}
            text={milks.name}
            imageSrc={milks.image}
            altText={`${milks.name} milk`}
            price={milks.price}
            onClick={() => onSelectMilk(milks.id)}
            />
            ))}
        </div>
    );
};

export default Milks;