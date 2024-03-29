import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../store/store";
import Header from "./Header";
import TaskColumn from "./TaskColumn";
import { fetchTaskListsAsync, selectTaskLists } from '../slices/taskListSlice';

const TaskArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasklists = useSelector(selectTaskLists);

  const closedTasklistIndex = tasklists.findIndex(tasklist => tasklist.title === "Closed");
  let modifiedTasklists = closedTasklistIndex !== -1 ? tasklists.filter(tasklist => tasklist.title !== "Closed") : [...tasklists];
  if (closedTasklistIndex !== -1) {
    modifiedTasklists.push(tasklists[closedTasklistIndex]);
  }

  useEffect(() => {
    dispatch(fetchTaskListsAsync());
  }, [dispatch]); 

  return (
    <div className="w-9/10 h-full my-8 rounded-large bg-white shadow-lg">
      <Header />
      <div className="flex mx-6">
        {modifiedTasklists.map((tasklist) => {
          return <TaskColumn tasklist={tasklist} />;
        })}
      </div>
    </div>
  );
};

export default TaskArea;
