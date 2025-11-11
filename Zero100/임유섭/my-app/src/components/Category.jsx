const options = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행중" },
  { key: "done", label: "완료" },
];

export default function Category({ value = "all", onChange }) {
  return (
    <div className="filter-wrap">
      {options.map((o) => (
        <button
          key={o.key}
          className={`filter-btn ${value === o.key ? "active" : ""}`}
          onClick={() => onChange?.(o.key)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}