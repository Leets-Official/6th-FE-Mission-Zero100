import Checkbox from "./checkBox";
import Button from "./button";

function TodoItem({taskName}){
    return(
        <li>
            <Checkbox label={taskName} />
            <div className="buttonGroup">
                <Button>Edit </Button>
                <Button>Delete</Button>
            </div>
        </li>
    );
}

export default TodoItem;