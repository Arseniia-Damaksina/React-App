enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
  }

interface Title {
  title: string
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
  taskList: Title;
};

export interface TaskList {
  id: number;
  title: string;
}

export interface TaskListsState {
  taskLists: TaskList[];
  status: 'loading' | 'succeeded' | 'failed' | '';
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  status: 'loading' | 'succeeded' | 'failed' | '';
  error: string | null;
}