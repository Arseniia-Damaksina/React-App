import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createTaskAsync } from "../../slices/taskSlice";
import { FormData, TaskList } from "../../types/types";

const AddTaskForm: React.FC<{
  tasklist: TaskList;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ tasklist, setModalOpen }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTaskAsync({ ...formData, taskListId: tasklist.id }));
    window.location.reload();
    setFormData({
      name: "",
      description: "",
      dueDate: "",
      priority: "",
    });
  };

  return (
    <div className="flex flex-col items-center w-80 border-2 border-secondary bg-white rounded-2xl">
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-end">
          <button onClick={() => setModalOpen(false)}>
          <XMarkIcon className="w-6 h-6 mr-3 mt-3" />
          </button>
        </div>
        <h1 className="text-secondary w-full font-bold text-3xl p-3 text-center">
          Add Task
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col py-3 w-5/6">
        <label htmlFor="name">Task Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        />
        <label htmlFor="name">Description: </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        ></textarea>
        <label htmlFor="name">Date: </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        />
        <label htmlFor="name">Priority: </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="p-2 my-3 rounded-lg bg-secondary text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
