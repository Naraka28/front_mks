import React from "react";
import { useNavigate } from "react-router-dom";

interface BotonProps {
    texto: string;
    onClick?: () => void;
    tipo?: "primario" | "secundario" | "regresar";
    className?: string;
    disabled?: boolean;
    icono?: React.ReactNode;
    navigateTo?: string; // Nueva prop para navegación
}

const Boton: React.FC<BotonProps> = ({
    texto,
    onClick,
    tipo = "primario",
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

    const baseStyles = "rounded-lg px-4 py-2 font-medium transition-all flex items-center justify-center gap-2 font-[Poppins]";

    const tipoStyles = {
        primario: "bg-[#2F9673] text-white hover:bg-[#247a5c] active:bg-[#1a6048] shadow-sm hover:shadow-md",
        secundario: "bg-[#FAF9F6] text-[#333333] border border-[#E8E8E8] hover:bg-[#F9F6EE] hover:shadow-md",
        regresar: "bg-[#F7F2F2] text-[#333333] border border-[#E8E8E8] hover:bg-[#E8E8E8] hover:shadow-md",
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