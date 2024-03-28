import axios, { AxiosResponse } from 'axios';
import { TaskList } from '../types/types';

const API_BASE_URL: string = 'http://localhost:3000/api';

export const fetchTaskLists = async (): Promise<AxiosResponse<TaskList[]>> => {
  try {
    const response = await axios.get<TaskList[]>(`${API_BASE_URL}/tasklists`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch task lists');
  }
};