import React from "react";
import logo from "../assets/tudu.png";
import AddTasklistButton from "./AddTasklistButton";
import HistoryButton from "./HistoryButton";

const Header: React.FC = () => {
  return (
    <div className="min-h-20 w-full flex justify-between items-center pr-6 pl-4 py-4">
      <div className="flex justify-start items-center">
        <img className="w-16" src={logo} alt="Logo" />
        <h1 className="font-bold" style={{fontSize: "36px"}}>My Taskboard</h1>
      </div>
      <div className="flex">
        <HistoryButton />
        <AddTasklistButton />
      </div>
    </div>
  );
};

export default Header;
