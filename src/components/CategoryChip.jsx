import React from 'react';
import { themeContext } from '../Contexts/Themecontext';
import { useState,useContext } from 'react';

function CategoryChip({ title, isChosen, onClick}) {
  const { theme } = useContext(themeContext)

  return (
    <div
      onClick={onClick}
      className={`${
        isChosen ? "bg-amber-400 text-white": `${theme?("bg-black text-white"):("bg-white")}`
      } cursor-pointer hover:bg-amber-100  hover:text-black inline-block m-2 p-2 w-fit px-4 border border-amber-200 rounded-md `}
    >
      <h1>{title}</h1>
    </div>
  );
}

export default CategoryChip;
