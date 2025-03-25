interface ButtonProps {
    text: string;
    imageSrc: string;
    altText: string;
    onClick?: () => void; // Prop para manejar clics
}

const Button: React.FC<ButtonProps> = ({ text, imageSrc, altText, onClick }) => {
    return (
        <button
            className="bg-pink-200 rounded-2xl px-6 py-3 gap-6 shadow-md flex flex-col items-center "
            onClick={onClick} // Ejecutar función al hacer clic
        >
            <img src={imageSrc} alt={altText || "Button image"} className="size-36 object-contain rounded-md" />
            <span className="text-black font-bold text-2xl ">{text}</span>
        </button>
    );
};

export default Button;
