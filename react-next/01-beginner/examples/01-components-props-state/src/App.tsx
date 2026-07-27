import { useState } from 'react';
import { Button } from './components/Button';
import { TaskItem, type Task } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';

function createId(): string {
  return `t-${crypto.randomUUID().slice(0, 8)}`;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: createId(), title: 'เรียน Props', done: true },
    { id: createId(), title: 'ฝึก Immutable State', done: false },
  ]);

  const doneCount = tasks.filter((t) => t.done).length;

  function addTask(title: string) {
    // Immutable: สร้าง array ใหม่ ไม่ใช่ push ลงของเดิม
    setTasks((prev) => [...prev, { id: createId(), title, done: false }]);
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  return (
    <main>
      <h1>Components · Props · Immutable State</h1>

      <section className="card">
        <p>
          เสร็จแล้ว <strong>{doneCount}</strong> / {tasks.length} งาน
          {/* derived state — คำนวณตอน render ไม่เก็บซ้ำใน useState */}
        </p>
        <TaskForm onSubmit={addTask} />
      </section>

      <section className="card">
        <div className="row">
          <Button
            label="ล้างงานที่เสร็จแล้ว"
            variant="ghost"
            disabled={doneCount === 0}
            onClick={clearDone}
          />
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />
          ))}
        </ul>
      </section>
    </main>
  );
}
