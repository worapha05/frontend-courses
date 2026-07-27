import { memo } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  category: 'dev' | 'design';
};

type ProductListProps = {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

/**
 * memo + stable onSelect (useCallback ฝั่ง parent)
 * → re-render เฉพาะเมื่อ products / selectedId เปลี่ยน
 */
export const ProductList = memo(function ProductList({
  products,
  selectedId,
  onSelect,
}: ProductListProps) {

  return (
    <div>
      {products.map((p) => (
        <div className="product" key={p.id}>
          <span>
            {p.name} {selectedId === p.id ? <span className="render-badge">selected</span> : null}
          </span>
          <button type="button" className="secondary" onClick={() => onSelect(p.id)}>
            เลือก
          </button>
        </div>
      ))}
    </div>
  );
});
