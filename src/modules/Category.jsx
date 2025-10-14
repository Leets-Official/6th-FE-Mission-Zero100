const CATEGORIES = [
    {value : 'all', label: 'All'},
    {value : 'active', label: 'Avtive'},
    {value : 'completed', label: 'Completed'},
  ];


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
    <div className="grid grid-cols gap-2">
      {CATEGORIES.map(({value, label}) =>(
        <CategoryButton
        key={value}
        isSelected={selected === value}
        onClick={()=>onCategoryChange(value)}
        >
          {label}
        </CategoryButton>
      ))}
    </div>
  );
}

export default Category;