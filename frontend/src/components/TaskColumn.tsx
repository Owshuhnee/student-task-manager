import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import type { Task, TaskStatus } from '../types/task';

interface TaskColumnProps {
  status: TaskStatus;
  label: string;
  accentColor: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskColumn({ status, label, accentColor, tasks, onTaskClick }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-xl border transition-colors ${
        isOver ? 'border-[#171717] bg-[#fafafa]' : 'border-[#e5e5e5] bg-[#fcfcfc]'
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#e5e5e5] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accentColor}`} />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#171717]">{label}</span>
        </div>
        <span className="text-xs font-medium text-[#a3a3a3]">{tasks.length}</span>
      </div>
      <div className="flex min-h-[120px] flex-col gap-2 p-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
        {tasks.length === 0 && <p className="py-6 text-center text-xs text-[#a3a3a3]">No tasks</p>}
      </div>
    </div>
  );
}