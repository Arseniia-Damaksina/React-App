import axios, { AxiosResponse } from 'axios';
import { TaskList } from '../types/types';

const API_BASE_URL = 
// "https://react-app-server-29xg.onrender.com/api"
import.meta.env.NODE_ENV === "production"
  ? import.meta.env.BASE_URL_PROD
  : import.meta.env.BASE_URL_DEV;

export const fetchTaskLists = async (): Promise<AxiosResponse<TaskList[]>> => {
  try {
    const response = await axios.get<TaskList[]>(`${API_BASE_URL}/tasklists`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch task lists');
  }
};

export const createTaskList = async (title: string): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.post<TaskList>(`${API_BASE_URL}/tasklists`, { title });
    return response;
  } catch (error) {
    throw new Error('Failed to create task list');
  }
};

export const updateTaskList = async (taskListId: number, title: string): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.put<TaskList>(`${API_BASE_URL}/tasklists/${taskListId}/update`, { title });
    return response;
  } catch (error) {
    throw new Error('Failed to edit task list');
  }
};

export const deleteTaskList = async (taskListId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/tasklists/${taskListId}/delete`);
  } catch (error) {
    throw new Error('Failed to delete task list');
  }
};