import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaMugHot, FaCoffee, FaGlassMartini, FaCookie } from "react-icons/fa";

const CATEGORIES = [
    { icon: FaMugHot, name: "Bebida Caliente" },
    { icon: FaCoffee, name: "Cafés" },
    { icon: FaGlassMartini, name: "Bebida Fría" },
    { icon: FaCookie, name: "Postre" },
];

interface SidebarProps {
    onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleSelect = (category: string) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <aside className="flex flex-col items-center w-full h-full rounded-3xl shadow-lg py-4 justify-between">
            <FaChevronUp className="text-gray-600 cursor-pointer text-xl" />

            <div className="flex flex-col items-center gap-4">
                {CATEGORIES.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(item.name)}
                        className={`flex items-center justify-center p-8 border shadow-md rounded-full transition 
                            ${selectedCategory === item.name ? "bg-gray-300" : "bg-white hover:bg-gray-200"}
                        `}
                    >
                        <item.icon className="text-gray-900 text-4xl" />
                    </button>
                ))}
            </div>

            <FaChevronDown className="text-gray-600 cursor-pointer text-xl" />
        </aside>
    );
};

export default Sidebar;
