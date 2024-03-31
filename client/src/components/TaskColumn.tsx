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
import TaskListMenu from "./TaskListMenu";
import Task from "./Task";
import AddTaskButton from "./buttons/AddTaskButton";
import AddTaskForm from "./forms/AddTaskForm";
import { updateTaskListAsync, selectTaskLists } from "../slices/taskListSlice";
import { fetchTasksAsync, selectTasks } from "../slices/taskSlice";
import Modal from "./ui/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeString } from "../utils/utilFunctions";

const TaskColumn: React.FC<{ tasklist: TaskList }> = ({ tasklist }) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  const tasklists = useSelector(selectTaskLists);

  const [open, setOpen] = React.useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
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
      toast.error("Task list cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    dispatch(
      updateTaskListAsync({
        taskListId: tasklist.id,
        updatedTitle: capitalizeString(updatedTaskList),
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
    <>
      {addModalOpen && (
        <Modal active={addModalOpen} setActive={setAddModalOpen}>
          <AddTaskForm tasklist={tasklist} setAddModalOpen={setAddModalOpen} />
        </Modal>
      )}

      <div className="w-64 flex flex-col mr-4">
        {tasklist.title !== "Closed" ? (
          <>
            <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-tertiary">
              {updateForm ? (
                <form onSubmit={handleSubmit} className="mr-2">
                  <input
                    type="text"
                    value={updatedTaskList}
                    onChange={handleChange}
                    placeholder="Edit your tasklist"
                    className="rounded-lg p-2"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 mt-2 mr-2 rounded-lg bg-secondary text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleHideButtonClick}
                    className="px-2 py-1 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
                  >
                    Hide
                  </button>
                </form>
              ) : (
                <p className="font-bold">{tasklist.title}</p>
              )}
              <div className="flex items-center">
                <span className="font-bold pr-1">{tasksByCategory.length}</span>
                <TaskListMenu
                  id={tasklist.id}
                  onClick={handleButtonClick}
                  setAddModalOpen={setAddModalOpen}
                />
              </div>
            </div>
            <AddTaskButton onClick={() => setAddModalOpen(true)} />
            <div>
              {tasksByCategory.map((task) => {
                return <Task key={task.id} task={task} tasklists={tasklists} />;
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
        <ToastContainer />
      </div>
    </>
  );
};

export default TaskColumn;
