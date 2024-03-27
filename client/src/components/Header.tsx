import React from "react";
import logo from "../assets/tudu.png";
import AddTasklistButton from "./AddTasklistButton";

const Header: React.FC = () => {
  return (
    <div className="min-h-20 w-full flex justify-between items-center">
      <div className="flex justify-start items-center">
        <img className="w-16" src={logo} alt="Logo" />
        <span>My Taskboard</span>
      </div>
      <AddTasklistButton />
    </div>
  );
};

export default Header;
