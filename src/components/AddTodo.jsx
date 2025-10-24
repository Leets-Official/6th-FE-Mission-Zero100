import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Text from "./Text";
//  AddTodo Component
// 새로운 할 일을 입력받아 상위 컴포넌트의 tasks 상태를 업데이트
export default function AddTodo({ setTasks }) {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        // 새로운 할 일을 기존 task 배열에 추가
        // label: 할 일 내용 / completed: 완료 여부(false로 초기화)
        setTasks((prev) => [...prev, { label: input, completed: false }]);
        // 입력창 초기화
        setInput("");
    };

    return (
        <div className="mb-4">
            <Text as="h2" className="text-lg sm:text-xl text-gray-600 mb-2 text-center">
                What needs to be done?
            </Text>

            <div className="mb-2">
                <Input
                    aria-label="New task"
                    placeholder="Enter a task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} //// 입력값 변경 시 state 업데이트
                />
            </div>

            <Button variant="primary" className="w-full" onClick={handleAdd}>
                Add
            </Button>
        </div>
    );
}
