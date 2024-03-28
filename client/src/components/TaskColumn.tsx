import React from "react";
import { Tasklist } from "../types/types";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TaskMenu from "./TaskMenu";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";

const TaskColumn: React.FC<{ tasklist: Tasklist }> = ({ tasklist }) => {
  const [open, setOpen] = React.useState<number | null>(null);

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

  const tudu = [
    {
      id: 1,
      name: "Buy milk",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Medium",
      taskListId: 1,
      tasklist: "To Do",
    },
    {
      id: 2,
      name: "Do homework",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Low",
      taskListId: 2,
      tasklist: "To Do",
    },
    {
      id: 3,
      name: "Do not homework",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      dueDate: "23/04/2024",
      priority: "Low",
      taskListId: 2,
      tasklist: "In Progress",
    },
    {
      id: 4,
      name: "Buy apples",
      description: "Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "High",
      taskListId: 1,
      tasklist: "Closed",
    },
    {
      id: 5,
      name: "Buy milk",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Medium",
      taskListId: 1,
      tasklist: "To Do",
    },
    {
      id: 6,
      name: "Buy milk",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Medium",
      taskListId: 1,
      tasklist: "To Do",
    },
    {
      id: 7,
      name: "Buy milk",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Medium",
      taskListId: 1,
      tasklist: "Closed",
    },
    {
      id: 8,
      name: "Do homework",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam tellus et felis vehicula facilisis.",
      dueDate: "23/04/2024",
      priority: "Low",
      taskListId: 2,
      tasklist: "Closed",
    },
    {
      id: 9,
      name: "Do not homework",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      dueDate: "23/04/2024",
      priority: "Low",
      taskListId: 2,
      tasklist: "Closed",
    },
  ];
  const tasks = tudu.filter((task) => task.tasklist === tasklist.title);

  const handleOpen = (value: number) =>{
    setOpen((prev) => (prev === value ? null : value));
  }

  return (
    <div className="w-64 flex flex-col mr-4">
      {tasklist.title !== "Closed" ? (
        <>
          <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-tertiary">
            <p className="font-bold">{tasklist.title}</p>
            <div className="flex items-center">
              <span className="font-bold pr-1">4</span>
              <TaskMenu />
            </div>
          </div>
          <AddTaskButton />
          <div>
            {tasks.map((task) => {
              return <Task key={task.id} task={task} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-primary">
            <p className="font-bold">{tasklist.title}</p>
            <div className="flex items-center">
              <span className="font-bold pr-2">4</span>
            </div>
          </div>
          <div>
            {tasks.map((task) => {
              return (
                <Accordion key={task.id} className="h-min">
                  <AccordionHeader onClick={() => handleOpen(task.id)}>
                    {task.name}
                  </AccordionHeader>
                  {open === task.id && (
                    <AccordionBody className="block">
                      <p className="text-secondaryVariant my-2 border-l-2 border-secondary pl-2">
                        {task.description.slice(0, 45) + "... More"}
                      </p>
                      <div className="flex mb-2">
                        <CalendarDaysIcon className="h-6 w-6 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                      <div
                        className={`w-fit px-2 pb-1 flex justify-center rounded-lg  font-semibold ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        <span className="font-semibold">{task.priority}</span>
                      </div>
                    </AccordionBody>
                  )}
                </Accordion>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskColumn;
