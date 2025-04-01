import { useState } from "react";
import imageAd from "../../assets/Ad.png";
import imageTransition from "../../assets/test.png";
import { useNavigate } from "react-router-dom";

function UserHome() {
    const [showApp, setShowApp] = useState(false);
    const [showTransition, setShowTransition] = useState(false);
    const navigate = useNavigate(); // Hook para navegar

    const handleClick = () => {
        setShowTransition(true);
        setTimeout(() => {
            setShowApp(true);
            navigate("/Menu"); // Navega a /Menu
        }, 20);
    };

    // Estilo común para ambas imágenes
    const imageStyle: React.CSSProperties = {
        width: "100%", // o un valor fijo como "500px" si prefieres
        height: "auto", // mantiene la proporción
        maxWidth: "100%", // asegura que no exceda el contenedor
        maxHeight: "100vh", // asegura que no exceda la altura de la pantalla
        objectFit: "contain" // mantiene la relación de aspecto
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            {!showApp && (
            <img
                src={showTransition ? imageTransition : imageAd}
                alt="Ad"
                style={imageStyle}
                className="transition-opacity duration-1000 ease-in-out"
                onClick={handleClick}
            />
            )}
        </div>
    );
}

export default UserHome;