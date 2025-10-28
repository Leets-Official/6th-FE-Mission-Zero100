import Text from "./Text";
import Todo from "./Todo";

export default function TodoList({ tasks, setTasks, filter }) {
    //  필터링 (All / Active / Completed)
    const filteredTasks = tasks.filter((t) => {
        if (filter === "Active") return !t.completed;
        if (filter === "Completed") return t.completed;
        return true;
    });

    //  삭제 기능
    const handleDelete = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    //  완료 상태 토글 기능
    const handleToggle = (index) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    //  이름 수정 기능 (Edit → Save)
    const handleEdit = (index, newLabel) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index ? { ...task, label: newLabel } : task
            )
        );
    };

    return (
        <section className="mt-6">
            {/* 남은 할 일 개수 표시 */}
            <Text as="h3" className="text-xl sm:text-2xl font-semibold">
                {filteredTasks.length} tasks remaining
            </Text>

            <ul className="mt-4 flex flex-col gap-4">
                {filteredTasks.map((task, idx) => (
                    <Todo
                        key={idx}
                        id={`task-${idx}`}
                        label={task.label}
                        completed={task.completed}   //  completed 전달
                        onDelete={() => handleDelete(idx)} // 삭제 버튼 동작
                        onToggle={() => handleToggle(idx)} // 체크박스 토글 동작
                        onEdit={(newLabel) => handleEdit(idx, newLabel)} //  수정 기능 동작
                    />
                ))}
            </ul>
        </section>
    );
}
