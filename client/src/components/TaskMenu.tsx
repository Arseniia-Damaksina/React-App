import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
  } from "@material-tailwind/react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";


const TaskMenu = () => {
    return (
        <Menu>
        <MenuHandler>
        <EllipsisVerticalIcon className="w-6 h-6"/>
        </MenuHandler>
        <MenuList>
          <MenuItem>Edit</MenuItem>
          <MenuItem>+ Add New Card</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    )
}

export default TaskMenu;