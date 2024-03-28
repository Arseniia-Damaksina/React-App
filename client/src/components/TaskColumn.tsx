import React from "react";
import { Tasklist } from "../types/types";
import TaskMenu from "./TaskMenu";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";


const TaskColumn: React.FC<{ tasklist: Tasklist }> = ({tasklist}) => {
    const tudu = [
        {
          id: 1,
          name: "Buy milk",
          description: "description",
          dueDate: "23/04/2024",
          priority: "Medium",
          taskListId: 1,
          tasklist: "To Do"
        },
        {
          id: 2,
          name: "Do homework",
          description: "description",
          dueDate: "Updated",
          priority: "Low",
          taskListId: 2,
          tasklist: "To Do"
        },
        {
          id: 3,
          name: "Do not homework",
          description: "description",
          dueDate: "Updated",
          priority: "Low",
          taskListId: 2,
          tasklist: "In Progress"
        },
        {
          id: 4,
          name: "Buy apples",
          description: "description",
          dueDate: "23/04/2024",
          priority: "High",
          taskListId: 1,
          tasklist: "Closed"
        },
      ];
    const tasks = tudu.filter((task) => task.tasklist === tasklist.title) 
   
    return (
        <div className="w-64 flex flex-col mr-4">
            <div className={`flex justify-between p-3 rounded-lg ${tasklist.title === "Closed" ? "bg-primary" : "bg-tertiary"}`}>
                <span>{tasklist.title}</span>
                <div className="flex items-center">
                  <span>4</span>
                  <TaskMenu />
                </div>
            </div>
            {tasklist.title !== "Closed" && <AddTaskButton />}
            <div>
                {tasks.map((task) => {
                    return <Task key={task.id} task={task} />
                })
                }
            </div>
        </div>
    )
}

export default TaskColumn;