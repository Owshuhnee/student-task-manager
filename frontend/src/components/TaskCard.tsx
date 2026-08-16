import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task';

const STATUS_DOT: Record<Task['status'], string> = {
  Backlog: 'bg-[#a3a3a3]',
  Ongoing: 'bg-[#3b82f6]',
  Complete: 'bg-[#22c55e]',
  Incomplete: 'bg-[#f97316]',
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-[#e5e5e5] bg-white p-3 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] transition-shadow"
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full shrink-0 ${STATUS_DOT[task.status]}`} />
        <h3 className="text-sm font-semibold text-[#171717] truncate">{task.title}</h3>
      </div>
      {task.description && (
        <p className="mt-1 text-xs text-[#525252] line-clamp-2">{task.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between text-[10px] font-medium tracking-wider uppercase text-[#a3a3a3]">
        <span>
          {new Date(task.due_date).toLocaleDateString('en-NZ', { day: '2-digit', month: 'short' })}
        </span>
        <span>{task.priority}</span>
      </div>
    </div>
  );
}