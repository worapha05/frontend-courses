'use client';

import { useEffect, useState } from 'react';

const KEY = 'rn-bootcamp-wishlist';

type WishlistButtonProps = {
  productId: string;
  productName: string;
};

export function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      setSaved(ids.includes(productId));
    } catch {
      setSaved(false);
    }
  }, [productId]);

  function toggle() {
    const raw = localStorage.getItem(KEY);
    const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const next = saved ? ids.filter((id) => id !== productId) : [...ids, productId];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      style={{
        border: 'none',
        borderRadius: 6,
        padding: '0.4rem 0.75rem',
        background: saved ? '#0f766e' : '#e2e8f0',
        color: saved ? '#fff' : '#0f172a',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {saved ? '♥ ใน Wishlist' : `♡ Wishlist: ${productName}`}
    </button>
  );
}
