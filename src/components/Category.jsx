import Button from "./Button";

export default function Category() {
    return (
        <div className="flex gap-2 mt-4">
            <Button variant="secondary" className="flex-1">
                All
            </Button>
            <Button variant="secondary" className="flex-1">
                Active
            </Button>
            <Button variant="secondary" className="flex-1">
                Completed
            </Button>
        </div>
    );
}
