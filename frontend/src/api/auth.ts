import { apiFetch } from './client';
import { USE_MOCKS } from './mockConfig';
import * as mock from './auth.mock';
import type { User } from '../types/user';

export function register(name: string, email: string, password: string): Promise<User> {
  if (USE_MOCKS) return mock.register(name, email, password);
  return apiFetch<User>('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

export function login(email: string, password: string): Promise<User> {
  if (USE_MOCKS) return mock.login(email, password);
  return apiFetch<User>('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function logout(): Promise<void> {
  if (USE_MOCKS) return mock.logout();
  return apiFetch<void>('/api/logout', { method: 'POST' });
}

export function getMe(): Promise<User | null> {
  if (USE_MOCKS) return mock.getMe();
  return apiFetch<User | null>('/api/me');
}

export function updateMe(name: string, email: string): Promise<User> {
  if (USE_MOCKS) return mock.updateMe(name, email);
  return apiFetch<User>('/api/me', { method: 'PATCH', body: JSON.stringify({ name, email }) });
}

export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  if (USE_MOCKS) return mock.changePassword(currentPassword, newPassword);
  return apiFetch<void>('/api/me/password', { method: 'PATCH', body: JSON.stringify({ currentPassword, newPassword }) });
}