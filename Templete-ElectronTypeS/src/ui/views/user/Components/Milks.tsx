import { getAllowedMilks } from "../../../services/productsServices";
import Button from "../auxiliaryComponents/ButtonCard";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";


interface MilksProps {
    onSelectMilk: (id: number) => void;
    productId: number; // ID del producto para el que se seleccionan los sabores

}

const Milks: React.FC<MilksProps> = ({ onSelectMilk, productId }) => {

    const { data: milksOptions, isLoading, error } = useQuery({
        queryKey: ["milks", productId], // Incluye productId para evitar datos en caché incorrectos
        queryFn: () => getAllowedMilks(productId),
    });

    if (isLoading) return <div className='flex items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1} /></div>;
    if (error) return <p>Error loading milks</p>;



    return (
        <div className="grid grid-cols-2  md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-4">
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