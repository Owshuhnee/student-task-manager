import { apiFetch } from './client';
import { USE_MOCKS } from './mockConfig';
import * as mock from './tasks.mock';
import type { Task } from '../types/task';

export function getTasks(): Promise<Task[]> {
  if (USE_MOCKS) return mock.getTasks();
  return apiFetch<Task[]>('/api/tasks');
}

export function createTask(data: Omit<Task, 'id'>): Promise<Task> {
  if (USE_MOCKS) return mock.createTask(data);
  return apiFetch<Task>('/api/tasks', { method: 'POST', body: JSON.stringify(data) });
}

export function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  if (USE_MOCKS) return mock.updateTask(id, data);
  return apiFetch<Task>(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteTask(id: number): Promise<void> {
  if (USE_MOCKS) return mock.deleteTask(id);
  return apiFetch<void>(`/api/tasks/${id}`, { method: 'DELETE' });
}