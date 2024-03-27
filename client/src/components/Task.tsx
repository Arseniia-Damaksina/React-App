import React from "react";
import { TaskType } from "../types/types";

const Task: React.FC<{ task: TaskType}> = ({task}) => {
    return (
        <div className="p-3">
            <div>
                {task.name}
            </div>
            <div>
                {task.description}
            </div>
            <div>
                {task.dueDate}
            </div>
            <div>
                {task.priority}
            </div>
        </div>
    )
}

export default Task