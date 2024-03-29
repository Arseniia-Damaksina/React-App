import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../store/store";
import { deleteTaskListAsync } from "../slices/taskListSlice";

const TaskListMenu = ({ id, onClick }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTaskList = (taskListId) => {
    dispatch(deleteTaskListAsync(taskListId));
  };

  return (
    <Menu>
      <MenuHandler>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={onClick}>Edit</MenuItem>
        <MenuItem>+ Add New Task</MenuItem>
        <MenuItem onClick={() => handleDeleteTaskList(id)}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskListMenu;
