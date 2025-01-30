import { z } from 'zod';
import type { PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
};

export type UserState = {
  status: 'loading' | 'logged' | 'guest';
  data: User | null;
  error: string | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export const registerSchema = z.object({
  name: z.string().min(1, 'Имя должно быть больше 1 символа'),
  email: z.string().email('Не корректный email'),
  password: z.string().min(6, 'Пароль должен содержать 6 символов'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Не корректный email'),
  password: z.string().min(6, 'Пароль должен содержать 6 символов'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export type UseUserReturnType = {
  user: UserState;
  error: string | null;
  loginHandler: (loginData: LoginCredentials) => Promise<PayloadAction<unknown>>;
  logoutHandler: () => Promise<PayloadAction<unknown>>;
  submitHandler: (registerData: RegisterFormData) => Promise<PayloadAction<unknown>>;
};
