import React from "react";
import Header from "./Header";
import TaskColumn from "./TaskColumn";

const tasklists = [
  {
    id: 1,
    title: "To Do",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "Closed",
  },
];

const TaskArea: React.FC = () => {
  return (
    <div className="w-9/10 h-9/10 rounded-large bg-white shadow-lg">
      <Header />
      <div className="flex mx-6">
        {tasklists.map((tasklist) => {
          return <TaskColumn tasklist={tasklist} />;
        })}
      </div>
    </div>
  );
};

export default TaskArea;
