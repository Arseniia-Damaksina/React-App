import React from "react";
import { TaskType } from "../types/types";
import TaskMenu from "./TaskMenu";

const Task: React.FC<{ task: TaskType}> = ({task}) => {
    const getPriorityColor = (priority: string): string => {
        switch (priority) {
            case "Low":
                return "bg-yellowPriority text-yellowSecondary border border-yellowSecondary"; 
            case "Medium":
                return "bg-primaryVariant text-coolBlack";
            case "High":
                return "bg-primary text-black";
            default:
                return "bg-gray-200";
        }
    };

    return (
        <div className="mb-3 p-3 rounded-lg bg-tertiaryLight">
            <div className="w-full flex justify-between">
                <span>{task.name}</span>
                <TaskMenu />
            </div>
            <div className="my-2">
               <span className="text-secondaryVariant border-l-4 border-secondary pl-2">{task.description}</span>
            </div>
            <div>
                {task.dueDate}
            </div>
            <div className={`w-fit px-2 flex justify-center rounded-lg  font-semibold ${getPriorityColor(task.priority)}`}>
                <span className="font-semibold">{task.priority}</span>
            </div>
        </div>
    )
}

export default Task