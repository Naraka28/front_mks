import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';

export default function MultiSelectDropDown({content}) {

    const [searchText, setSearchText] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const setOption = (value) => {
        if(selectedOptions.includes(value)){
            const opts = selectedOptions.filter(item=>item!==value);
            setSelectedOptions([...opts]);
        }else{
            setSelectedOptions([...selectedOptions, value]);
        }
    }

    useEffect(() => {
        const match = content.filter(item=>item?.value.toLowerCase().includes(searchText?.toLowerCase()));
        
        if(match){
            setFilterOptions(match);
        }else{
            setFilterOptions(content);
        }
    
    }, [searchText]);

  return (
    <div className='border border-gray-300 rounded-md p-6'>
        <div>
            <div className='flex gap-2 items-center text-xs flex-wrap'>
                {
                    selectedOptions.map(opt => {
                        return(
                            <span key={opt} className='bg-gray-200 rounded-md px-2 flex items-center gap-1'>{opt} <span className='cursor-pointer' onClick={()=>setOption(opt)}><IoMdClose/></span> </span>
                        )
                    })
                }
            </div>
            <input type="text" placeholder='search' className='py-2 px-4 w-full outline-none' onKeyUp={(e)=>setSearchText(e.target.value)} />
        </div>
         
        
        <div className='flex flex-col border-t-2 border-gray-400 py-4 max-h-[300px] overflow-y-auto'>
            {
                filterOptions.map(option => {
                    return(
                        <div key={option.value} className='flex items-center gap-2 hover:bg-gray-200 cursor-pointer p-2' 
                        onClick={()=>setOption(option.value)}>
                            <input type="checkbox" checked={selectedOptions.includes(option.value)} />
                            {option.label}
                        </div>
                    )
                })
            }
        </div>


    </div>
  )
}
