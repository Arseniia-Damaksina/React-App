import { useEffect } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { useAppDispatch } from "../store/store";
  import { deleteTaskAsync } from "../slices/taskSlice";
  import { fetchTasksAsync } from "../slices/taskSlice";
  
  const TaskMenu = ({ id, onClick }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchTasksAsync());
    }, [dispatch]);
  
    const handleDeleteTask = (taskListId) => {
      dispatch(deleteTaskAsync(taskListId)).then(() => {
        dispatch(fetchTasksAsync());
      });
      
    };
  
    return (
      <Menu>
        <MenuHandler>
          <EllipsisVerticalIcon className="w-6 h-6" />
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={onClick}>Edit</MenuItem>
          <MenuItem onClick={() => handleDeleteTask(id)}>Delete</MenuItem>
        </MenuList>
      </Menu>
    );
  };
  
  export default TaskMenu;
  