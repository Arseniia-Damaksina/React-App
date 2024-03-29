import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createTaskListAsync } from "../slices/taskListSlice";

const AddTasklistButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newTaskList, setNewTaskList] = useState<string>("");
  const [taskListForm, setTaskListForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskList.trim()) { 
      console.log("Task list name cannot be empty");
      return;
    }
    dispatch(createTaskListAsync(newTaskList));
    setNewTaskList("");
    setTaskListForm(false);
  };

  const handleButtonClick : React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskListForm(true);
  };

  const handleHideButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskListForm(false);
  };

  return (
    <>
      {taskListForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTaskList}
            onChange={handleChange}
            placeholder="Add your tasklist"
          />
          <button type="submit">Create</button>
          <button onClick={handleHideButtonClick}>Hide</button>
        </form>
      ) : (
        <button
          className="p-3 rounded-lg bg-secondary text-white"
          onClick={handleButtonClick}
        >
          + Create New List
        </button>
      )}
    </>
  );
};

export default AddTasklistButton;
