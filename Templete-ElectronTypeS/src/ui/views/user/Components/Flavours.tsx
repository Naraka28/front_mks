import { getAllowedFlavors } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";
import { useQuery } from '@tanstack/react-query';
import { SyncLoader } from "react-spinners";



interface FlavoursProps {
    onSelectFlavour: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan los sabores
}

const Flavours: React.FC<FlavoursProps> = ({ onSelectFlavour, productId }) => {
    const { data: flavourOptions, isLoading, error } = useQuery({
        queryKey: ["flavors", productId], // Incluye productId para evitar datos en caché incorrectos
        queryFn: () => getAllowedFlavors(productId),   
    });
    

    if (isLoading) return <div className='flex items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1} /></div>;
    if (error) return <p>Error al cargar los sabores</p>;


    return (
        <div className="grid grid-cols-4  md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-4 font-[Poppins]">
            {flavourOptions?.map((flavour) => (
                <Button
                    key={flavour.id}
                    text={flavour.name}
                    imageSrc={flavour.image}
                    price={flavour.price}
                    altText={`${flavour.name} flavor`}
                    onClick={() => onSelectFlavour(flavour.id)}
                />
            ))}
        </div>
    );
};

export default Flavours;