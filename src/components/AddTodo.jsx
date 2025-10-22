import Input from "./Input";
import Button from "./Button";
import Text from "./Text";

export default function AddTodo() {
    return (
        <div className="mb-4">

            <Text as="h2" className="text-lg sm:text-xl text-gray-600 mb-2 text-center">
                What needs to be done?
            </Text>

            <div className="mb-2">
                <Input aria-label="New task" placeholder="Enter a task" />
            </div>

            <Button variant="primary" className="w-full">
                Add
            </Button>
        </div>
    );
}
