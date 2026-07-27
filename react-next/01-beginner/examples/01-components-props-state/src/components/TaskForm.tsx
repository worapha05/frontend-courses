import { useState, type FormEvent } from 'react';
import { Button } from './Button';

type TaskFormProps = {
  onSubmit: (title: string) => void;
};

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTitle('');
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="ชื่องานใหม่"
        aria-label="ชื่องานใหม่"
      />
      <Button type="submit" label="เพิ่ม" disabled={!title.trim()} />
    </form>
  );
}
