import { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';

export function TaskList() {
  const { tasks, filter, toggleTask } = useTasks();

  const visible = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.done);
      case 'done':
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  if (visible.length === 0) {
    return <p className="muted">ยังไม่มีงานในมุมมองนี้</p>;
  }

  return (
    <div>
      {visible.map((task) => (
        <div key={task.id} className={`task${task.done ? ' done' : ''}`}>
          <label className="row">
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            <span className="title">{task.title}</span>
            <span className={`badge ${task.priority}`}>{task.priority}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
