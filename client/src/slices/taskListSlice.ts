import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskList, TaskListsState } from '../types/types';
import { RootState } from '../store/rootReducer';
import { fetchTaskLists } from '../api/taskListsAPI';

const initialState: TaskListsState = {
    taskLists: [],
    status: '',
    error: null,
  };
  
  export const fetchTaskListsAsync = createAsyncThunk(
    'taskLists/fetchTaskLists',
    async () => {
      try {
        const response = await fetchTaskLists();
        return response.data as TaskList[];
      } catch (error) {
        throw new Error('Failed to fetch task lists');
      }
    }
  );
  
  const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTaskListsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTaskListsAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.taskLists = action.payload;
        })
        .addCase(fetchTaskListsAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string | null;;
        });
    },
  });
  
  export const selectTaskLists = (state: RootState) => state.taskLists.taskLists;
  
  export default taskListsSlice.reducer;