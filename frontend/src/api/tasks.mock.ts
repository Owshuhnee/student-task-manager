import type { Task } from '../types/task';

let mockTasks: Task[] = [
  {
    id: 1,
    title: 'Finish SD204B assessment',
    description: 'Write up Task 3 implementation evidence',
    due_date: '2026-08-20',
    priority: 'High',
    status: 'Ongoing',
  },
  {
    id: 2,
    title: 'Print keychain batch',
    description: 'Run the 10-piece order on the Ender',
    due_date: '2026-08-18',
    priority: 'Medium',
    status: 'Backlog',
  },
  {
    id: 3,
    title: 'Submit CNC roster swap request',
    description: 'Ask supervisor to cover Thursday shift',
    due_date: '2026-08-14',
    priority: 'High',
    status: 'Incomplete',
    reflection: 'Missed the deadline — forgot to check the roster until Friday morning.',
  },
];

let nextId = 4;

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function getTasks(): Promise<Task[]> {
  return delay([...mockTasks]);
}

export function createTask(data: Omit<Task, 'id'>): Promise<Task> {
  const newTask: Task = { ...data, id: nextId++ };
  mockTasks = [...mockTasks, newTask];
  return delay(newTask);
}

export function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, ...data } : t));
  const updated = mockTasks.find((t) => t.id === id);
  if (!updated) return Promise.reject(new Error(`Task ${id} not found`));
  return delay(updated);
}

export function deleteTask(id: number): Promise<void> {
  mockTasks = mockTasks.filter((t) => t.id !== id);
  return delay(undefined);
}