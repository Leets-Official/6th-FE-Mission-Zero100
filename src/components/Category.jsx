//필터링 버튼 모음
function Category() {
  return (
    <div className='text-center'>
      <button type="button"
      className="w-24 rounded border">
        All
      </button>


      <button type="button"
      className="w-24 rounded border">
        Active
        </button>

      <button type="button"
      className="w-24 rounded border">
        Completed
        </button>
    </div>
  );
}

export default Category;

