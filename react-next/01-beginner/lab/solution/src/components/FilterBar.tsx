import { useTasks } from '../context/TaskContext';
import type { Filter } from '../types/task';

const FILTERS: Filter[] = ['all', 'active', 'done'];

export function FilterBar() {
  const { filter, setFilter } = useTasks();

  return (
    <div className="row">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          className={`ghost filter${filter === f ? ' active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
