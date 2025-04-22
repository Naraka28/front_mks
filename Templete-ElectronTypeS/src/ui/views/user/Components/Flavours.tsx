import { getAllowedFlavors } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";
import { useQuery } from '@tanstack/react-query';



interface FlavoursProps {
    onSelectFlavour: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan los sabores
}

const Flavours: React.FC<FlavoursProps> = ({ onSelectFlavour, productId }) => {
    const { data: flavourOptions, isLoading, error } = useQuery({
        queryKey: ["flavors", productId], // Incluye productId para evitar datos en caché incorrectos
        queryFn: () => getAllowedFlavors(productId),   
    });
    

    if (isLoading) return <p>Cargando sabores...</p>;
    if (error) return <p>Error al cargar los sabores</p>;


    return (
        <div className="grid grid-cols-4 gap-4 p-4 font-[Poppins]">
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