function TaskList() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Checkbox
      id="task1"
      label="Eat"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
}

export default TaskList;



