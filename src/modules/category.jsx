import React from 'react';


const CategoryButton = ({ children, isSelected, onClick }) => {
  const baseStyle = 'py-2 px-8 font-semibold transition-all duration-300 min-w-28 border border-black';
  const selectedStyle = 'bg-slate-900 text-white';
  const notSelectedStyle = 'bg-white text-slate-500 hover:bg-slate-100';

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${isSelected ? selectedStyle : notSelectedStyle}`}
    >
      {children}
    </button>
  );
};


function Category({ selected, onCategoryChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <CategoryButton 
        isSelected={selected === 'All'} 
        onClick={() => onCategoryChange('All')}
      >
        All
      </CategoryButton>
      <CategoryButton 
        isSelected={selected === 'Active'}
        onClick={() => onCategoryChange('Active')}
      >
        Active
      </CategoryButton>
      <CategoryButton 
        isSelected={selected === 'Completed'}
        onClick={() => onCategoryChange('Completed')}
      >
        Completed
      </CategoryButton>
    </div>
  );
}

export default Category;