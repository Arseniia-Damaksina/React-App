import React from "react";
import { TaskType } from "../types/types";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TaskMenu from "./TaskMenu";

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
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
    <div className="mb-3 pt-3 pb-4 pl-4 pr-2 rounded-lg bg-tertiaryLight">
      <div className="w-full flex justify-between">
        <p className="font-bold">{task.name}</p>
        <TaskMenu />
      </div>
      <p className="text-secondaryVariant my-2 border-l-2 border-secondary pl-2">
        {task.description.slice(0, 45) + "... More"}
      </p>
      <div className="flex mb-2">
        <CalendarDaysIcon className="h-6 w-6 mr-1"/>
       <span>{task.dueDate}</span>
        </div>
      <div
        className={`w-fit px-2 pb-1 flex justify-center rounded-lg  font-semibold ${getPriorityColor(
          task.priority
        )}`}
      >
        <span className="font-semibold">{task.priority}</span>
      </div>
    </div>
  );
};

export default Task;
