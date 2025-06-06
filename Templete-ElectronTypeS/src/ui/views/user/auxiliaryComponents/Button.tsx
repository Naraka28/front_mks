import React from "react";
import { useNavigate } from "react-router-dom";

interface BotonProps {
    texto: string;
    onClick?: () => void;
    tipo?: "terminar" | "regresar";
    className?: string;
    disabled?: boolean;
    icono?: React.ReactNode;
    navigateTo?: string; // Nueva prop para navegación
}

const Boton: React.FC<BotonProps> = ({
    texto,
    onClick,
    tipo = "terminar",
    className = "",
    disabled = false,
    icono,
    navigateTo,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
        onClick?.();
    };

    const baseStyles = "rounded-2xl px-4 py-2 transition-all flex items-center justify-center gap-2 font-[Poppins]";

    const tipoStyles = {
        terminar: "text-stone-800 font-bold text-lg shadow-lg bg-white rounded-xl border-2 border-[#E8E8E8] hover:bg-[#F7F2F2] transition duration-300 ease-in-out flex items-center justify-center",
        regresar: "text-stone-800 font-bold text-lg shadow-lg bg-white rounded-xl border-2 border-[#E8E8E8] hover:bg-[#F7F2F2] transition duration-300 ease-in-out flex items-center justify-center",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button
            className={`${baseStyles} ${tipoStyles[tipo]} ${disabled ? disabledStyles : ""} ${className}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {icono && <span>{icono}</span>}
            {texto}
        </button>
    );
};

export default Boton;