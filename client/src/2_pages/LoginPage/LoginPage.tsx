import React from 'react';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginCredentials } from '../../5_entities/user/types/types';
import { loginSchema } from '../../5_entities/user/types/types';
import { useUser } from '../../5_entities/user/hooks/userHook';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import InputMask, { Props as InputMaskProps } from 'react-input-mask';
type InputProps = InputMaskProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const { loginHandler } = useUser();

  async function onSubmit(data: LoginCredentials): Promise<void> {
    await loginHandler(data);
    reset();
    await navigate('/myList');
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputMask
          className={styles.input}
          mask="+7\ (999) 999-99-99"
          {...register('phoneNumber')}
          placeholder="+7 (___) ___-__-__"
        >
          {(inputProps: InputProps) => <input {...inputProps} type="text" />}
        </InputMask>
        {errors.phoneNumber && <p className={styles.text}>{errors.phoneNumber.message}</p>}

        <input
          className={styles.input}
          type="password"
          {...register('password')}
          placeholder="Введите пароль"
        />
        {errors.password && <p className={styles.text}>{errors.password.message}</p>}

        <button className={styles.button} type="submit">
          Вход
        </button>
      </form>
    </main>
  );
}
