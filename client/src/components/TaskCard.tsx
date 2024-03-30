import React from "react";
import { TaskInterface } from "../types/types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

const TaskCard: React.FC<{
  task: TaskInterface;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ task, setTaskModalOpen, setEditModalOpen }) => {
  const handleEdit = () => {
    setEditModalOpen(true);
    setTaskModalOpen(false);
  };

  const handleClose = () => {
    setEditModalOpen(false);
    setTaskModalOpen(false);
  };
  return (
    <div className="flex flex-col items-start w-96 bg-white rounded-xl">
      <div className="w-full flex justify-end bg-secondary rounded-t-xl p-2">
        <button onClick={handleEdit}>
          <PencilSquareIcon className="w-6 h-6 text-white mr-2" />
        </button>
        <button onClick={handleClose}>
          <XMarkIcon className="w-6 h-6 text-white mr-2" />
        </button>
      </div>
      <div className="w-full flex justify-start">
        <div className="flex justify-start">
          <p className="text-secondary w-full font-bold text-3xl p-3 text-center">
            {task.name}
          </p>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/3 flex flex-col text-lg px-3">
          <p className="w-full text-gray-400 pb-3">Task List</p>
          <p className="text-gray-400 pb-3">Date</p>
          <p className="text-gray-400 pb-3">Priority</p>
        </div>
        <div className="w-1/3 flex flex-col text-lg px-3">
          <p className="w-full pb-3">{task.taskList.title}</p>
          <p className="w-full pb-3">{task.dueDate}</p>
          <p className="w-full pb-3">{task.priority}</p>
        </div>
      </div>
      <div className="w-2/3 px-3 pb-2">
        <p className="text-xl font-bold py-2">Description</p>
        <p className="text-gray-400 pb-3">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
