export type Task = {
  id: string;
  title: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {

  return (
    <li className={task.done ? 'done' : undefined}>
      <label className="row">
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        <span>{task.title}</span>
      </label>
      <button type="button" className="btn btn-ghost" onClick={() => onRemove(task.id)}>
        ลบ
      </button>
    </li>
  );
}
