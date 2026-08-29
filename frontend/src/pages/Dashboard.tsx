import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserSquare, SignOut } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import * as tasksApi from '../api/tasks';
import KanbanBoard from '../components/KanbanBoard';
import TaskForm from '../components/TaskForm';
import ReflectionModal from '../components/ReflectionModal';
import ConfirmModal from '../components/ConfirmModal';
import type { Task, TaskStatus } from '../types/task';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [pendingIncomplete, setPendingIncomplete] = useState<Task | null>(null);
  const [reflectionValue, setReflectionValue] = useState('');

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    tasksApi.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  function openCreateForm() {
    setEditingTask(null);
    setShowForm(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  function handleTaskSaved(saved: Task) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === saved.id);
      return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [...prev, saved];
    });
    closeForm();
  }

  function handleRequestDelete(task: Task) {
    setTaskToDelete(task);
  }

  async function confirmDelete() {
    if (!taskToDelete) return;
    await tasksApi.deleteTask(taskToDelete.id);
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
    closeForm();
  }

  async function handleStatusChange(taskId: number, newStatus: TaskStatus) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (newStatus === 'Incomplete') {
      setPendingIncomplete(task);
      setReflectionValue(task.reflection ?? '');
      return;
    }

    const updated = await tasksApi.updateTask(taskId, { status: newStatus });
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  }

  async function saveReflection() {
    if (!pendingIncomplete) return;
    const updated = await tasksApi.updateTask(pendingIncomplete.id, {
      status: 'Incomplete',
      reflection: reflectionValue,
    });
    setTasks((prev) => prev.map((t) => (t.id === pendingIncomplete.id ? updated : t)));
    setPendingIncomplete(null);
    setReflectionValue('');
  }

  function cancelReflection() {
    setPendingIncomplete(null);
    setReflectionValue('');
  }

  const pendingCount = tasks.filter((t) => t.status === 'Backlog' || t.status === 'Ongoing').length;

  const today = new Date();
  const dayLabel = today.toLocaleDateString('en-NZ', { weekday: 'long' }).toUpperCase();
  const dateLabel = today.toLocaleDateString('en-NZ', { month: 'long', day: 'numeric' }).toUpperCase();

  return (
    <div className="min-h-screen bg-white font-['Manrope']">
      <header className="flex items-center justify-between border-b border-[#171717] px-8 py-6 lg:px-16">
        <div>
          <h1 className="text-2xl font-bold text-[#171717]">Fander University</h1>
          <p className="text-sm tracking-wide text-[#a3a3a3]">STUDENT TASK MANAGER</p>
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/dashboard" className="text-base font-bold text-[#525252] hover:text-[#171717]">
            Dashboard
          </Link>
          <Link
            to="/account"
            className="flex items-center gap-1.5 text-base font-bold text-[#525252] hover:text-[#171717]"
          >
            <UserSquare size={20} weight="regular" />
            {user?.name}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-base font-bold text-[#525252] hover:text-[#171717]"
          >
            <SignOut size={20} weight="regular" />
            Logout
          </button>
        </nav>
      </header>

      <main className="px-8 py-10 lg:px-16">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[#a3a3a3]">
              {dayLabel}, {dateLabel}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#171717]">
              Hey {user?.name}, Here's whats next.
            </h2>
            <p className="mt-2 text-base text-[#525252]">
              {pendingCount === 0
                ? "You're all caught up. Take a breath."
                : `You have ${pendingCount} task${pendingCount > 1 ? 's' : ''} to do.`}
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="rounded-2xl bg-[#171717] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2b2b2b]"
          >
            + New Task
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-[#a3a3a3]">Loading tasks...</p>
        ) : (
          <KanbanBoard tasks={tasks} onTaskClick={openEditForm} onStatusChange={handleStatusChange} />
        )}
      </main>

      {showForm && (
        <TaskForm
          existingTask={editingTask ?? undefined}
          onSaved={handleTaskSaved}
          onClose={closeForm}
          onRequestDelete={editingTask ? () => handleRequestDelete(editingTask) : undefined}
        />
      )}

      <ReflectionModal
        open={!!pendingIncomplete}
        value={reflectionValue}
        onChange={setReflectionValue}
        onSave={saveReflection}
        onCancel={cancelReflection}
      />

      <ConfirmModal
        open={!!taskToDelete}
        message={`Delete "${taskToDelete?.title}"? This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}