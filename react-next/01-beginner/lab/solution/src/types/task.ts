export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: string;
};

export type Filter = 'all' | 'active' | 'done';
