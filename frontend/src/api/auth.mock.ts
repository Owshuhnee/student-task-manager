import type { User } from '../types/user';

const mockUsers: (User & { password: string })[] = [
  { id: 1, name: 'Test Student', email: 'test@example.com', password: 'password123' },
];
let nextId = 2;
let loggedInUser: User | null = null;

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function register(name: string, email: string, password: string): Promise<User> {
  if (mockUsers.some((u) => u.email === email)) {
    return Promise.reject(new Error('An account with that email already exists'));
  }
  const user: User = { id: nextId++, name, email };
  mockUsers.push({ ...user, password });
  loggedInUser = user;
  return delay(user);
}

export function login(email: string, password: string): Promise<User> {
  const match = mockUsers.find((u) => u.email === email && u.password === password);
  if (!match) return Promise.reject(new Error('Incorrect email or password'));
  loggedInUser = { id: match.id, name: match.name, email: match.email };
  return delay(loggedInUser);
}

export function logout(): Promise<void> {
  loggedInUser = null;
  return delay(undefined);
}

export function getMe(): Promise<User | null> {
  return delay(loggedInUser);
}

export function updateMe(name: string, email: string): Promise<User> {
  if (!loggedInUser) return Promise.reject(new Error('Not logged in'));
  const record = mockUsers.find((u) => u.id === loggedInUser!.id);
  if (!record) return Promise.reject(new Error('User not found'));
  if (email !== record.email && mockUsers.some((u) => u.email === email)) {
    return Promise.reject(new Error('An account with that email already exists'));
  }
  record.name = name;
  record.email = email;
  loggedInUser = { id: record.id, name: record.name, email: record.email };
  return delay(loggedInUser);
}

export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  if (!loggedInUser) return Promise.reject(new Error('Not logged in'));
  const record = mockUsers.find((u) => u.id === loggedInUser!.id);
  if (!record) return Promise.reject(new Error('User not found'));
  if (record.password !== currentPassword) {
    return Promise.reject(new Error('Current password is incorrect'));
  }
  record.password = newPassword;
  return delay(undefined);
}