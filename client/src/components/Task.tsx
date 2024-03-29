import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { TaskInterface, TaskList } from "../types/types";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TaskMenu from "./TaskMenu";
import EditTaskForm from "./forms/EditTaskForm";
import { updateTaskAsync, fetchTasksAsync } from "../slices/taskSlice";

const Task: React.FC<{ task: TaskInterface; tasklists: TaskList[] }> = ({
  task,
  tasklists,
}) => {
  const [selectMove, setSelectMove] = useState<string>("Move To");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

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

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectMove(selectedOption);
    const updatedTaskList = tasklists.find((tasklist) => tasklist.title === selectedOption);
    if (updatedTaskList) {
      await dispatch(updateTaskAsync({ taskId: task.id, updatedTask: { ...task, taskListId: updatedTaskList.id } }));
      window.location.reload(); 
    }
  };


  return (
    <div className="mb-3 pt-3 pb-4 pl-4 pr-2 rounded-lg bg-tertiaryLight">
      <EditTaskForm task={task} />
      <div className="w-full flex justify-between">
        <p className="font-bold">{task.name}</p>
        <TaskMenu id={task.id} />
      </div>
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
      <select
        name="moveTo"
        value={selectMove}
        onChange={(e) => handleSelectChange(e)}
      >
        <option value="">Move To</option>
        {tasklists.map((taskList) => (
          <option key={taskList.id} value={taskList.title}>
            {taskList.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Task;
