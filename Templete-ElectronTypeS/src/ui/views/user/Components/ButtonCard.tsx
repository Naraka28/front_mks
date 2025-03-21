import React from "react";

interface ButtonCardProps {
    text: string;
    imageSrc: string;
    altText?: string;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ text, imageSrc, altText }) => {
    return (
        <button className="bg-pink-200 rounded-2xl px-6 py-3 gap-6 shadow-md flex flex-col items-center ">
            <img src={imageSrc} alt={altText || "Button image"} className="size-40 object-contain rounded-md" />
            <span className="text-black font-bold text-2xl ">{text}</span>
        </button>
    );
};

export default ButtonCard;
