import { useState, type FormEvent } from 'react';
import { useTasks } from '../context/TaskContext';
import { taskFormSchema, type TaskFormValues } from '../lib/validation';
import type { Priority } from '../types/task';

const initial: TaskFormValues = { title: '', priority: 'medium' };

export function TaskForm() {
  const { addTask } = useTasks();
  const [values, setValues] = useState<TaskFormValues>(initial);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = taskFormSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง');
      return;
    }
    addTask(result.data);
    setValues(initial);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          value={values.title}
          onChange={(e) => {
            setValues((v) => ({ ...v, title: e.target.value }));
            setError(null);
          }}
          placeholder="ชื่องาน (อย่างน้อย 3 ตัวอักษร)"
          aria-label="ชื่องาน"
        />
        <select
          value={values.priority}
          onChange={(e) => setValues((v) => ({ ...v, priority: e.target.value as Priority }))}
          aria-label="ความสำคัญ"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" disabled={!values.title.trim()}>
          เพิ่ม
        </button>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}
