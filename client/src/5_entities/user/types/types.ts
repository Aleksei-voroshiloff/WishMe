import { z } from 'zod';
import type { PayloadAction } from '@reduxjs/toolkit';
import { WishListObjectSchema } from '../../wishlist/types/types';

export type User = {
  id: number;
  name: string;
  avatar: string | null;
  birthday: string | null;
};

export type getUserType = {
  User: User;
}

export const OneUserShema = z.object({
  id: z.number(),
  name: z.string(),
  birthday: z.string().nullable(),
  avatar: z.string().nullable(),
});
export const PresentUserShema = z.object({
  Wishlists: z.array(WishListObjectSchema),
  id: z.number(),
  name: z.string(),
  birthday: z.string().nullable(),
  avatar: z.string().nullable(),
});
export type PresentUserType = z.infer<typeof PresentUserShema>;
export type OneUserType = z.infer<typeof OneUserShema>;

export const MyDataShema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  birthday: z.string().nullable(),
  avatar: z.string().nullable(),
});
export type MyDataType = z.infer<typeof MyDataShema>;

export const UserPostShema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
  file: z.instanceof(File).nullable(),
});

export type UserDataPostType = z.infer<typeof UserPostShema>;

export type DataUpdateType = {
  id: number;
  updateData: FormData;
};

export type UserState = {
  status: 'loading' | 'logged' | 'guest';
  data: User | null;
  error: string | null;
  oneUser: OneUserType | null;
  myCabinet: MyDataType | null;
};

export type AuthResponse = {
  user: OneUserType;
  accessToken: string;
};

export const registerSchema = z.object({
  name: z.string().min(1, 'Имя должно быть больше 1 символа'),
  phoneNumber: z.string(),
  password: z.string().min(6, 'Пароль должен содержать 6 символов'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  phoneNumber: z.string(),
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
