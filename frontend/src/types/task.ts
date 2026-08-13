export type TaskStatus = 'Backlog' | 'Ongoing' | 'Complete' | 'Incomplete';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;       // ISO date string, e.g. "2026-08-20"
  priority: TaskPriority;
  status: TaskStatus;
  notes?: string;          // optional — the ? means this field can be left out
  reflection?: string;     // optional — only required when status is 'Incomplete'
}