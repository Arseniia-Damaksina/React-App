import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { TaskList } from "../types/types";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TaskMenu from "./TaskMenu";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";
import { updateTaskListAsync } from "../slices/taskListSlice";
import { fetchTasksAsync, selectTasks } from "../slices/taskSlice";

const TaskColumn: React.FC<{ tasklist: TaskList }> = ({ tasklist }) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);

  const [open, setOpen] = React.useState<number | null>(null);
  const [updatedTaskList, setUpdatedTaskList] = React.useState<string>(
    tasklist.title
  );
  const [updateForm, setUpdateForm] = React.useState<boolean>(false);

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

  const tasksByCategory = tasks.filter(
    (task) => task.taskList.title === tasklist.title
  );

  const handleOpen = (value: number) => {
    setOpen((prev) => (prev === value ? null : value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedTaskList.trim()) {
      console.log("Task list name cannot be empty");
      return;
    }
    dispatch(
      updateTaskListAsync({
        taskListId: tasklist.id,
        updatedTitle: updatedTaskList,
      })
    ).then(() => {
      dispatch(fetchTasksAsync());
    });
    setUpdateForm(false);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setUpdateForm(true);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setUpdateForm(false);
  };

  return (
    <div className="w-64 flex flex-col mr-4">
      {tasklist.title !== "Closed" ? (
        <>
          <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-tertiary">
            {updateForm ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={updatedTaskList}
                  onChange={handleChange}
                  placeholder="Edit your tasklist"
                />
                <button type="submit">Edit</button>
                <button onClick={handleHideButtonClick}>Hide</button>
              </form>
            ) : (
              <p className="font-bold">{tasklist.title}</p>
            )}
            <div className="flex items-center">
              <span className="font-bold pr-1">{tasksByCategory.length}</span>
              <TaskMenu id={tasklist.id} onClick={handleButtonClick} />
            </div>
          </div>
          <AddTaskButton />
          <div>
            {tasksByCategory.map((task) => {
              return <Task key={task.id} task={task} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-primary">
            <p className="font-bold">{tasklist.title}</p>
            <div className="flex items-center">
              <span className="font-bold pr-2">{tasksByCategory.length}</span>
            </div>
          </div>
          <div>
            {tasksByCategory.map((task) => {
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
