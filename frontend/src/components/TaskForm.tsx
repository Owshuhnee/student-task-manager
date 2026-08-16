import { useState } from 'react';
import type { FormEvent } from 'react';
import { Trash } from '@phosphor-icons/react';
import * as tasksApi from '../api/tasks';
import ReflectionModal from './ReflectionModal';
import type { Task, TaskPriority, TaskStatus } from '../types/task';

interface TaskFormProps {
  existingTask?: Task;
  onSaved: (task: Task) => void;
  onClose: () => void;
  onRequestDelete?: () => void;
}

export default function TaskForm({ existingTask, onSaved, onClose, onRequestDelete }: TaskFormProps) {
  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(existingTask?.description ?? '');
  const [dueDate, setDueDate] = useState(existingTask?.due_date ?? '');
  const [priority, setPriority] = useState<TaskPriority>(existingTask?.priority ?? 'Medium');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status ?? 'Backlog');
  const [notes, setNotes] = useState(existingTask?.notes ?? '');
  const [reflection, setReflection] = useState(existingTask?.reflection ?? '');
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handleStatusChange(newStatus: TaskStatus) {
    if (newStatus === 'Incomplete') {
      setShowReflectionModal(true);
      return;
    }
    setStatus(newStatus);
  }

  function confirmIncomplete() {
    setStatus('Incomplete');
    setShowReflectionModal(false);
  }

  function cancelIncomplete() {
    setShowReflectionModal(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!dueDate) {
      setError('Due date is required.');
      return;
    }

    setSaving(true);
    try {
      const payload = { title, description, due_date: dueDate, priority, status, notes, reflection };
      const saved = existingTask
        ? await tasksApi.updateTask(existingTask.id, payload)
        : await tasksApi.createTask(payload);
      onSaved(saved);
    } catch {
      setError('Could not save task. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl font-['Manrope']">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#171717]">{existingTask ? 'Edit Task' : 'New Task'}</h2>
            {existingTask && onRequestDelete && (
              <button
                type="button"
                onClick={onRequestDelete}
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <Trash size={16} weight="bold" />
                Delete
              </button>
            )}
          </div>

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-[#525252]">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#525252]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#525252]">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#525252]">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#525252]">Status</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
              >
                <option value="Backlog">To do</option>
                <option value="Ongoing">In Progress</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#525252]">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl px-4 py-2 text-sm font-medium text-[#6b6b6b] hover:text-[#171717]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-[#171717] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2b2b2b] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ReflectionModal
        open={showReflectionModal}
        value={reflection}
        onChange={setReflection}
        onSave={confirmIncomplete}
        onCancel={cancelIncomplete}
      />
    </>
  );
}