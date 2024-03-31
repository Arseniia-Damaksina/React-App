import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createTaskListAsync } from "../../slices/taskListSlice";
import { capitalizeString } from "../../utils/utilFunctions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTasklistButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newTaskList, setNewTaskList] = useState<string>("");
  const [taskListForm, setTaskListForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskList.trim()) {
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
    dispatch(createTaskListAsync(capitalizeString(newTaskList)));
    setNewTaskList("");
    setTaskListForm(false);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskListForm(true);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskListForm(false);
  };

  return (
    <div className="flex items-center">
      {taskListForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTaskList}
            onChange={handleChange}
            placeholder="Add your tasklist"
            className="border border-secondary rounded-lg p-1 bg-white shadow-lg"
          />
          <button
            type="submit"
            className="py-1 px-2 ml-2 rounded-lg bg-secondary text-white"
          >
            Create
          </button>
          <button
            className="py-1 px-2 ml-2 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
            onClick={handleHideButtonClick}
          >
            Hide
          </button>
        </form>
      ) : (
        <button
          className="p-3 rounded-lg bg-secondary text-white"
          onClick={handleButtonClick}
        >
          + Create New List
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddTasklistButton;
