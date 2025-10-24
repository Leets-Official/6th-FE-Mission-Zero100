import Text from "./Text";
import Todo from "./Todo";

//  TodoList 컴포넌트
//  ㅈ전체 할 일 목록을 표시하고, 완료/삭제 기능 및 필터링 처리
export default function TodoList({ tasks, setTasks, filter }) {
    const filteredTasks = tasks.filter((t) => {
        if (filter === "Active") return !t.completed;
        if (filter === "Completed") return t.completed;
        return true;
    });
    // 선택한 항목 삭제
    const handleDelete = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };
    // 완료 상태 토글 (체크박스 클릭 시)
    const handleToggle = (index) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <section className="mt-6">
            <Text as="h3" className="text-xl sm:text-2xl font-semibold">
                {filteredTasks.length} tasks remaining
            </Text>

            <ul className="mt-4 flex flex-col gap-4">
                {filteredTasks.map((task, idx) => (
                    <Todo
                        key={idx}
                        id={`task-${idx}`}
                        label={task.label}
                        defaultChecked={task.completed}
                        onDelete={() => handleDelete(idx)} //삭제 버튼 동작
                        onToggle={() => handleToggle(idx)} // 체크박스 토글 동작
                    />
                ))}
            </ul>
        </section>
    );
}
