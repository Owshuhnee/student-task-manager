import { useState, type FormEvent } from 'react'
import { createTask, updateTask } from '../api/tasks'
import type { Task, TaskPriority, TaskStatus } from '../types/task'
import ReflectionModal from './ReflectionModal'

interface TaskFormProps {
  existingTask?: Task
  onSave: () => void
  onCancel: () => void
}

function TaskForm({ existingTask, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(existingTask?.title ?? '')
  const [description, setDescription] = useState(existingTask?.description ?? '')
  const [dueDate, setDueDate] = useState(existingTask?.due_date ?? '')
  const [priority, setPriority] = useState<TaskPriority>(existingTask?.priority ?? 'Medium')
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status ?? 'Backlog')
  const [notes, setNotes] = useState(existingTask?.notes ?? '')
  const [reflection, setReflection] = useState(existingTask?.reflection ?? '')
  const [showReflectionModal, setShowReflectionModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleStatusChange(newStatus: TaskStatus) {
    if (newStatus === 'Incomplete') {
      setShowReflectionModal(true) // status isn't committed until the reflection is confirmed
    } else {
      setStatus(newStatus)
    }
  }

  function handleReflectionSave() {
    setStatus('Incomplete')
    setShowReflectionModal(false)
  }

  function handleReflectionCancel() {
    setShowReflectionModal(false)
    // status was never changed, so the <select> snaps back to whatever it was on its own
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const payload = {
      title,
      description,
      due_date: dueDate,
      priority,
      status,
      notes,
      reflection: status === 'Incomplete' ? reflection : undefined,
    }
    try {
      if (existingTask) {
        await updateTask(existingTask.id, payload)
      } else {
        await createTask(payload)
      }
      onSave()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{existingTask ? 'Edit Task' : 'New Task'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>
          Due date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>

        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}>
            <option value="Backlog">Backlog</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </label>

        {status === 'Incomplete' && reflection && <p><em>Reflection: {reflection}</em></p>}

        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>

      <ReflectionModal
        open={showReflectionModal}
        value={reflection}
        onChange={setReflection}
        onSave={handleReflectionSave}
        onCancel={handleReflectionCancel}
      />
    </>
  )
}

export default TaskForm