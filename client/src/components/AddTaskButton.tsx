import React from "react";

const AddTaskButton: React.FC = () => {
  return (
    <button className="p-2 my-3 border border-tertiary rounded-lg bg-white">
      <span className="text-secondary">+ Add New Card</span>
    </button>
  );
};

export default AddTaskButton;
