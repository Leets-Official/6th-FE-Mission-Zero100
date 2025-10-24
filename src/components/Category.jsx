import Button from "./Button";

export default function Category({ filter, setFilter }) {
    // 필터 버튼 목록
    const filters = ["All", "Active", "Completed"];
    return (
        <div className="flex gap-2 mt-4">
            {filters.map((f) => (
                <Button
                    key={f}
                    // 현재 선택된 필터에 따라 버튼 스타일 변경
                    variant={filter === f ? "primary" : "secondary"}
                    className="flex-1"
                    onClick={() => setFilter(f)}
                >
                    {f}
                </Button>
            ))}
        </div>
    );
}
