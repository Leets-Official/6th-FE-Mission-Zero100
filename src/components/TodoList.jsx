import Text from "./Text";
import Todo from "./Todo";

export default function TodoList({ tasks }) {
    return (
        <section className="mt-6">
            <Text as="h3" className="text-lg sm:text-xl font-semibold">
                {tasks.length} tasks remaining
            </Text>
            <ul className="mt-4 flex flex-col gap-4">
                {tasks.map((label, idx) => (
                    <Todo
                        key={idx}
                        id={`task-${idx}`}
                        label={label}
                        defaultChecked={false}
                    />
                ))}
            </ul>
        </section>
    );
}
