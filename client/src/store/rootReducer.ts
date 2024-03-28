import { combineReducers } from "@reduxjs/toolkit";
import taskListsReducer from "../slices/taskListSlice";
import tasksReducer from "../slices/taskSlice";

const rootReducer = combineReducers({
  taskLists: taskListsReducer,
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;