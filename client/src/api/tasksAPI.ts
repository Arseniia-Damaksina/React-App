import axios, { AxiosResponse } from 'axios';
import { Task } from '../types/types';

const API_BASE_URL: string = 'http://localhost:3000/api';

export const fetchTasks = async (): Promise<AxiosResponse<Task[]>> => {
  try {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};