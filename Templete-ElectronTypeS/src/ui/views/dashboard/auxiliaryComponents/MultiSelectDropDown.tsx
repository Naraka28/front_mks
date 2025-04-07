import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaChevronDown } from "react-icons/fa6";

interface Option {
    value: string;
    label: string;
}

interface MultiSelectDropDownProps {
    content: Option[];
    onChange: (selected: string[]) => void;
}

export default function MultiSelectDropDown({ content, onChange }: MultiSelectDropDownProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [filterOptions, setFilterOptions] = useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const setOption = (value: string) => {
        if (selectedOptions.includes(value)) {
            const opts = selectedOptions.filter(item => item !== value);
            setSelectedOptions([...opts]);
            onChange([...opts]);
        } else {
            const newOptions = [...selectedOptions, value];
            setSelectedOptions(newOptions);
            onChange(newOptions);
        }
    };

    useEffect(() => {
        const match = content.filter(item => item.value.toLowerCase().includes(searchText.toLowerCase()));
        setFilterOptions(match.length ? match : content);
    }, [searchText, content]);

    useEffect(() => {
        const closeHandler = (event: MouseEvent) => {
            if (selectRef.current && !event.composedPath().includes(selectRef.current)) {
                setActive(false);
            }
        };
        document.addEventListener('click', closeHandler);
        return () => {
            document.removeEventListener('click', closeHandler);
        };
    }, []);

    return (
        <div className="border bg-gray-100 rounded-md m-auto border-gray-300 p-3 relative" ref={selectRef}>
            {/* Contenedor de opciones seleccionadas */}
            <div className="flex flex-wrap gap-2 items-center text-xs">
                {selectedOptions.map(opt => (
                    <span key={opt} className="bg-violet-200 rounded-lg px-2 py-1 flex items-center gap-1 font-bold">
                        {opt}
                        <span className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setOption(opt); }}>
                            <IoMdClose />
                        </span>
                    </span>
                ))}
                {/* Botón para abrir el input si hay opciones seleccionadas */}
                {selectedOptions.length > 0 && (
                    <a 
                        onClick={(e) => { e.stopPropagation(); setActive(!active); }} 
                        className="bg-violet-500 hover:bg-violet-600 text-white px-2 py-1 rounded-lg text-xs font-bold ml-auto"
                    >
                        <FaChevronDown />
                    </a>
                )}
            </div>

            {/* Input de búsqueda (solo visible si no hay opciones o está activo) */}
            {(selectedOptions.length === 0 || active) && (
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    className="bg-gray-100 w-full outline-none placeholder-gray-600"
                    onClick={(e) => { e.stopPropagation(); setActive(true); }} 
                    onChange={(e) => setSearchText(e.target.value)} 
                />
            )}

            {/* Dropdown con opciones filtradas */}
            {active && (
                <div className="flex flex-col border-t-2 border-violet-400 py-4 max-h-[300px] overflow-y-auto">
                    {filterOptions.map(option => (
                        <div key={option.value} className="flex items-center gap-2 hover:bg-violet-100 cursor-pointer p-2" 
                            onClick={(e) => { e.stopPropagation(); setOption(option.value); }}>
                            <input 
                                type="checkbox" 
                                className="accent-violet-800" 
                                checked={selectedOptions.includes(option.value)} 
                                readOnly
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}