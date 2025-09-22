function Checkbox({id, label, checked = false}){
  return (
    <label htmlFor={id}>
      <input id={id} type="checkbox" defaultChecked={checked}/>
      {label}
    </label>
  )
}
export default Checkbox;

/*
function Checkbox() {
  return (
    <label htmlFor="task1">
      <input id="task1" type="checkbox" />
      Eat
    </label>
  );
}

export default Checkbox;
*/
