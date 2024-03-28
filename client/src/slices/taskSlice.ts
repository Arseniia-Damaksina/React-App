import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types/types';
import { RootState } from '../store/rootReducer';
import { fetchTasks } from '../api/tasksAPI';

const initialState: TasksState = {
    tasks: [],
    status: '',
    error: null,
};

export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        try {
            const response = await fetchTasks();
            return response.data as Task[];
        } catch (error) {
            throw new Error('Failed to fetch tasks');
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string | null;
            });
    },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;