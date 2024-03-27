export type Tasklist = {
  id: number;
  title: string;
};

enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
  }

export type TaskType = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
  tasklist: string;
};
