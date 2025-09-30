import { Routes, Route } from "react-router-dom";
import TaskItem from "./components/TaskItem";
import Input from "./components/Input";
import Text from "./components/Text";
import Button from "./components/Button";

function Home() {
    const tasks = ["Eat", "Sleep", "Repeat"];

    return (
        <div style={{ maxWidth: 720, margin: "2rem auto" }}>
            <Text as="h1">TodoMatic</Text>
            <Text as="h2">What needs to be done?</Text>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Input aria-label="New task" placeholder="Add a task" />
                <Button>Add</Button>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Button>Show all tasks</Button>
                <Button>Show active tasks</Button>
                <Button>Show completed tasks</Button>
            </div>

            <Text as="h3" style={{ marginTop: 24 }}>
                {tasks.length} tasks remaining
            </Text>

            <ul style={{ marginTop: 16, display: "grid", gap: 16 }}>
                {tasks.map((label, idx) => (
                    <TaskItem
                        key={idx}
                        id={`task-${idx}`}
                        label={label}
                        defaultChecked={label === "Eat"}
                    />
                ))}
            </ul>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}
