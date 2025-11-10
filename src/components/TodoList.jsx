import Text from "@/components/Text";
import Todo from "@/components/Todo";

export default function TodoList({ tasks, setTasks, filter }) {
    //  필터링 (All / Active / Completed)
    const filteredTasks = tasks.filter((t) => {
        if (filter === "Active") return !t.completed;
        if (filter === "Completed") return t.completed;
        return true;
    });

    //  삭제 기능
    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    //  완료 상태 토글 기능
    const handleToggle = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    //  이름 수정 기능
    const handleEdit = (id, newLabel) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, label: newLabel } : task
            )
        );
    };

    //  표시 문구 처리 (필터 상태에 따라 달라짐)
    const taskLabel =
        filter === "Completed"
            ? `${filteredTasks.length} tasks completed`
            : `${filteredTasks.length} tasks remaining`;

    return (
        <section className="mt-6">
            {/* 남은 할 일 또는 완료된 할 일 개수 표시 */}
            <Text as="h3" className="text-xl sm:text-2xl font-semibold">
                {taskLabel}
            </Text>

            <ul className="mt-4 flex flex-col gap-4">
                {filteredTasks.map((task) => (
                    <Todo
                        key={task.id}
                        id={task.id}
                        label={task.label}
                        completed={task.completed} // completed 전달
                        onDelete={() => handleDelete(task.id)} // 삭제 버튼 동작
                        onToggle={() => handleToggle(task.id)} // 체크박스 토글 동작
                        onEdit={(newLabel) => handleEdit(task.id, newLabel)} // 수정 기능 동작
                    />
                ))}
            </ul>
        </section>
    );
}
