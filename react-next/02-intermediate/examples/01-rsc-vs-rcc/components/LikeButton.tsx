'use client';

import { useState } from 'react';

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
};

/** Client Component — ขอบเขต interactivity ที่เล็กที่สุด */
export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  async function handleLike() {
    setPending(true);
    try {
      await new Promise((r) => setTimeout(r, 200));
      setLikes((n) => n + 1);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={pending}
      style={{
        border: 'none',
        borderRadius: 6,
        padding: '0.4rem 0.75rem',
        background: '#be123c',
        color: '#fff',
        fontWeight: 600,
        cursor: pending ? 'wait' : 'pointer',
      }}
    >
      ❤️ {likes}
    </button>
  );
}
