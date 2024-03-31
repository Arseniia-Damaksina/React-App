import { ReactNode } from "react";

// export enum Priority {
//   High = "High",
//   Medium = "Medium",
//   Low = "Low",
// }

export interface FormData {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
}

interface Title {
  title: string;
}

export interface TaskInterface {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
  taskList: Title;
}

export interface addTask {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
}

export interface TasksState {
  tasks: TaskInterface[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface TaskList {
  id: number;
  title: string;
}

export interface TaskListsState {
  taskLists: TaskList[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface TasksState {
  tasks: TaskInterface[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export interface onClickButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}