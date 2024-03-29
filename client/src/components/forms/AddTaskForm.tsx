import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createTaskAsync } from "../../slices/taskSlice";
import { FormData, TaskList } from "../../types/types";

const AddTaskForm: React.FC<{ tasklist: TaskList }> = ({ tasklist }) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col border">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTaskForm;
