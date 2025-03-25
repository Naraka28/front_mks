import { useState } from "react";
import imageAd from "../../assets/Ad.png";
import imageTransition from "../../assets/test.png"; // Nueva imagen intermedia
import Menu from "./Menu";

function UserHome() {
    const [showApp, setShowApp] = useState(false);
    const [showTransition, setShowTransition] = useState(false);

    const handleClick = () => {
        setShowTransition(true); // Mostrar imagen intermedia
        setTimeout(() => {
            setShowApp(true); // Después de un tiempo, mostrar la app
        }, 2000); // 2 segundos de transición
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {!showApp ? (
                <img
                    src={showTransition ? imageTransition : imageAd}
                    alt="Ad"
                    className="transition-opacity duration-1000 ease-in-out"
                    onClick={handleClick}
                />
            ) : (
                <Menu />
            )}
        </div>
    );
}

export default UserHome;
