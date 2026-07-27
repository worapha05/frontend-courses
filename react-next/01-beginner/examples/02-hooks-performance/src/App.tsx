import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductList } from './components/ProductList';
import { useClock } from './hooks/useClock';
import { useDebouncedValue } from './hooks/useDebouncedValue';

type Product = {
  id: string;
  name: string;
  price: number;
  category: 'dev' | 'design';
};

const CATALOG: Product[] = [
  { id: '1', name: 'Mechanical Keyboard', price: 3200, category: 'dev' },
  { id: '2', name: '4K Monitor', price: 12900, category: 'dev' },
  { id: '3', name: 'Drawing Tablet', price: 8500, category: 'design' },
  { id: '4', name: 'Color Checker', price: 4100, category: 'design' },
  { id: '5', name: 'USB-C Hub', price: 1500, category: 'dev' },
];

export function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | Product['category']>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tickLog, setTickLog] = useState<string[]>([]);

  const debouncedQuery = useDebouncedValue(query, 300);
  const now = useClock(1000);

  // useEffect: sync ภายนอก + cleanup
  useEffect(() => {
    const label = `tick @ ${now.toLocaleTimeString('th-TH')}`;
    setTickLog((prev) => [label, ...prev].slice(0, 5));
  }, [now]);

  // useMemo: กรอง/เรียงแพงเมื่อ catalog ใหญ่ — deps ชัดเจน
  const visible = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return CATALOG.filter((p) => {
      const matchCategory = category === 'all' || p.category === category;
      const matchQuery = !q || p.name.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    }).sort((a, b) => a.price - b.price);
  }, [debouncedQuery, category]);

  // useCallback: คง reference ให้ ProductList ที่ถูก memo
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const selected = CATALOG.find((p) => p.id === selectedId) ?? null;

  return (
    <main>
      <h1>Hooks: useEffect · useMemo · useCallback</h1>

      <section className="card">
        <p className="muted">
          นาฬิกา (custom hook + effect cleanup): <strong>{now.toLocaleTimeString('th-TH')}</strong>
        </p>
        <ul className="muted">
          {tickLog.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <div className="row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            aria-label="ค้นหาสินค้า"
          />
          <button
            type="button"
            className={category === 'all' ? undefined : 'secondary'}
            onClick={() => setCategory('all')}
          >
            ทั้งหมด
          </button>
          <button
            type="button"
            className={category === 'dev' ? undefined : 'secondary'}
            onClick={() => setCategory('dev')}
          >
            Dev
          </button>
          <button
            type="button"
            className={category === 'design' ? undefined : 'secondary'}
            onClick={() => setCategory('design')}
          >
            Design
          </button>
        </div>
        <p className="muted">
          debounce query = <code>{debouncedQuery || '(ว่าง)'}</code> · พบ {visible.length} รายการ
        </p>
        <ProductList products={visible} selectedId={selectedId} onSelect={handleSelect} />
      </section>

      <section className="card">
        <h2>รายการที่เลือก</h2>
        {selected ? (
          <p>
            {selected.name} — {selected.price.toLocaleString('th-TH')} บาท
          </p>
        ) : (
          <p className="muted">ยังไม่ได้เลือก</p>
        )}
      </section>
    </main>
  );
}
