import { StoredUser } from './store';
import bcrypt from 'bcryptjs';

const initialPasswordHash = bcrypt.hashSync('AdminPassword123!', 10);
const users: StoredUser[] = [
  {
    id: 'user_admin',
    email: 'admin@nexus.ai',
    passwordHash: initialPasswordHash,
    name: 'Nexus Admin',
    role: 'SUPER_ADMIN',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_staff',
    email: 'engineer@company.com',
    passwordHash: bcrypt.hashSync('Engineer123!', 10),
    name: 'Staff ML Engineer',
    role: 'USER',
    createdAt: new Date().toISOString(),
  },
];

export const userRepository = {
  async findByEmail(email: string) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findById(id: string) {
    return users.find((u) => u.id === id) || null;
  },

  async create(data: { email: string; passwordHash: string; name?: string; role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN' }) {
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name || data.email.split('@')[0],
      role: data.role || 'USER',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },

  async findAll() {
    return users.map(({ passwordHash, ...safeUser }) => safeUser);
  },
};
