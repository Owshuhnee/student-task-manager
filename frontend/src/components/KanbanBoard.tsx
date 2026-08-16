import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import type { Task, TaskStatus } from '../types/task';

const COLUMNS: { status: TaskStatus; label: string; accentColor: string }[] = [
  { status: 'Backlog', label: 'To do', accentColor: 'bg-[#a3a3a3]' },
  { status: 'Ongoing', label: 'In Progress', accentColor: 'bg-[#3b82f6]' },
  { status: 'Complete', label: 'Complete', accentColor: 'bg-[#22c55e]' },
  { status: 'Incomplete', label: 'Incomplete', accentColor: 'bg-[#f97316]' },
];

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

export default function KanbanBoard({ tasks, onTaskClick, onStatusChange }: KanbanBoardProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = over.id as TaskStatus;
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) return;

    onStatusChange(taskId, newStatus);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.status}
            status={col.status}
            label={col.label}
            accentColor={col.accentColor}
            tasks={tasks.filter((t) => t.status === col.status)}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DndContext>
  );
}