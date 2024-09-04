import React from 'react';

function CategoryChip({ title, isChosen, onClick}) {
  return (
    <div
      onClick={onClick}
      className={`${
        isChosen ? "bg-amber-400 text-white" : "bg-white text-black"
      } cursor-pointer hover:bg-amber-100  hover:text-black inline-block m-2 p-2 w-fit px-4 border border-purple-200 rounded-md`}
    >
      <h1>{title}</h1>
    </div>
  );
}

export default CategoryChip;
