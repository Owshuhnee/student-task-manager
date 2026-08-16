import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserSquare, SignOut } from '@phosphor-icons/react'
import { useAuth } from '../context/AuthContext'
import { getTasks, deleteTask } from '../api/tasks'
import type { Task, TaskStatus } from '../types/task'
import TaskForm from '../components/TaskForm'
import ConfirmModal from '../components/ConfirmModal'

const STATUS_FILTERS: (TaskStatus | 'All')[] = ['All', 'Backlog', 'Ongoing', 'Complete', 'Incomplete']

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  function refetch() {
    getTasks().then(setTasks)
  }

  useEffect(() => {
    refetch()
  }, [])

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter)

  function openCreateForm() {
    setEditingTask(null)
    setShowForm(true)
  }

  function openEditForm(task: Task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function handleSaved() {
    setShowForm(false)
    setEditingTask(null)
    refetch()
  }

  async function confirmDelete() {
    if (!deletingTask) return
    await deleteTask(deletingTask.id)
    setDeletingTask(null)
    refetch()
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white font-['Manrope']">
      <header className="border-b border-black flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#171717] tracking-[1.2px]">Fander University</h2>
          <p className="text-[#a3a3a3] text-sm md:text-base tracking-[3.2px]">STUDENT TASK MANAGER</p>
        </div>

        <nav className="flex items-center gap-6 md:gap-9">
          <Link to="/dashboard" className="font-bold text-[#525252] text-base tracking-[0.8px] opacity-50">
            Dashboard
          </Link>
          <Link to="/account" className="flex items-center gap-1 font-bold text-[#525252] text-base">
            <UserSquare size={24} />
            {user?.name}
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1 font-bold text-[#525252] text-base">
            <SignOut size={24} />
            Logout
          </button>
        </nav>
      </header>

      <div className="px-6 md:px-12 lg:px-20 py-8">
        <button
          onClick={openCreateForm}
          className="mb-6 rounded-2xl bg-[#171717] text-white font-bold px-6 py-3 hover:bg-black transition-colors"
        >
          + New Task
        </button>

        <div className="flex gap-3 mb-6 flex-wrap">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              disabled={filter === status}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                filter === status
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#525252] border-[#a3a3a3] hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {showForm && (
          <TaskForm
            key={editingTask?.id ?? 'new'}
            existingTask={editingTask ?? undefined}
            onSave={handleSaved}
            onCancel={() => setShowForm(false)}
          />
        )}

        <ul className="space-y-4 mt-6">
          {filteredTasks.map((task) => (
            <li key={task.id} className="border border-[#a3a3a3] rounded-lg p-4">
              {task.status === 'Incomplete' && <strong className="text-red-600">[INCOMPLETE] </strong>}
              <strong>{task.title}</strong> — {task.priority} priority, due {task.due_date} — {task.status}
              <p className="text-sm text-[#525252]">{task.description}</p>
              {task.reflection && <p className="text-sm italic">Reflection: {task.reflection}</p>}
              <div className="mt-2 flex gap-3">
                <button onClick={() => openEditForm(task)} className="text-sm font-semibold underline">
                  Edit
                </button>
                <button onClick={() => setDeletingTask(task)} className="text-sm font-semibold underline text-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && <p className="text-[#525252] mt-6">No tasks match this filter.</p>}
      </div>

      <ConfirmModal
        open={deletingTask !== null}
        message={`Delete "${deletingTask?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  )
}

export default Dashboard