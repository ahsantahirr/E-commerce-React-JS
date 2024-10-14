import React, { useContext } from 'react';
import { themeContext } from '../Contexts/Themecontext';

function CategoryChip({ title, isChosen, onClick }) {
  const { theme } = useContext(themeContext);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer inline-block m-2 p-2 w-fit px-4 border rounded-md font-poppins
        ${isChosen 
          ? theme 
            ? "bg-white text-black" // Chosen and dark mode
            : "bg-black text-white" // Chosen and light mode
          : theme
            ? "bg-black text-white hover:bg-gray-700 hover:text-white" // Not chosen and dark mode
            : "bg-white text-black hover:bg-gray-100 hover:text-black" // Not chosen and light mode
        }`
      }
    >
      <h1>{title}</h1>
    </div>
  );
}

export default CategoryChip;
