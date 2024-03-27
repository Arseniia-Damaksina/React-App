import React from "react";

const AddTasklistButton: React.FC = () => {
  return (
    <button className="p-2 rounded-lg bg-secondary">
      <span className="text-white">+ Create New List</span>
    </button>
  );
};

export default AddTasklistButton;
