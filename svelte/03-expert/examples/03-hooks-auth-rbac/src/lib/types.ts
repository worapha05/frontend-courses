export type Role = 'user' | 'editor' | 'admin';

export type SessionUser = {
  id: string;
  username: string;
  role: Role;
};
