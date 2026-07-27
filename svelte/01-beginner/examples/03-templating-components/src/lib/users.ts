export type UserStatus = 'online' | 'away' | 'offline';

export type User = {
  id: string;
  name: string;
  role: string;
  status: UserStatus;
};

export const users: User[] = [
  { id: 'u1', name: 'Anya', role: 'Designer', status: 'online' },
  { id: 'u2', name: 'Ben', role: 'Engineer', status: 'away' },
  { id: 'u3', name: 'Chai', role: 'PM', status: 'offline' },
  { id: 'u4', name: 'Dao', role: 'Engineer', status: 'online' },
];

/** Fake async fetch สำหรับสาธิต {#await} */
export function fetchUser(id: string): Promise<User> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const found = users.find((u) => u.id === id);
      if (found) resolve(found);
      else reject(new Error(`ไม่พบ user id=${id}`));
    }, 900);
  });
}
