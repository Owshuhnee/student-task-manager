import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import type { Task, TaskStatus } from '../types/task';

interface TaskColumnProps {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskColumn({ status, label, tasks, onTaskClick }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-full shrink-0 snap-start flex-col rounded-lg transition-colors md:w-80 ${isOver ? 'bg-[#fafafa]' : ''}`}
    >
      <div className="flex items-baseline justify-between border-b border-[#171717] pb-2">
        <span className="text-base font-bold text-[#171717]">{label}</span>
        <span className="text-base font-bold text-[#171717]">{tasks.length}</span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
        {tasks.length === 0 && <p className="text-sm text-[#a3a3a3]">No tasks</p>}
      </div>
    </div>
  );
}