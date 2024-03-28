import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../store/store";
import Header from "./Header";
import TaskColumn from "./TaskColumn";
import { fetchTaskListsAsync, selectTaskLists } from '../slices/taskListSlice';

const TaskArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasklists = useSelector(selectTaskLists);

  useEffect(() => {
    dispatch(fetchTaskListsAsync());
  }, [dispatch]); 

  return (
    <div className="w-9/10 h-full my-8 rounded-large bg-white shadow-lg">
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
