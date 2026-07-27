import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './context/TaskContext';
import { useTheme } from './context/ThemeContext';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { tasks } = useTasks();

  // Derived state — ไม่เก็บใน useState
  const activeCount = tasks.filter((t) => !t.done).length;

  return (
    <main>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Personal Task Board</h1>
        <button type="button" className="ghost" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <section className="card">
        <p className="muted">
          งานที่ยังไม่เสร็จ: <strong>{activeCount}</strong> / {tasks.length}
        </p>
        <TaskForm />
      </section>

      <section className="card">
        <FilterBar />
        <div style={{ marginTop: '0.75rem' }}>
          <TaskList />
        </div>
      </section>
    </main>
  );
}
