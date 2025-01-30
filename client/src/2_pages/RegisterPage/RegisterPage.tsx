import { useAppDispatch } from '../../1_app/store/hooks';
import { registerSchema, type RegisterFormData } from '../../5_entities/user/types/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.scss';
import { submitHandler } from '../../5_entities/user/lib/userThunks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    await dispatch(submitHandler(data));
    reset();
    await navigate('/home');
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          {...register('name')}
          placeholder="Введите имя"
        />
        {errors.name && <p className={styles.text}>{errors.name.message}</p>}

        <input
          className={styles.input}
          type="email"
          {...register('email')}
          placeholder="example@example.com"
        />
        {errors.email && <p className={styles.text}>{errors.email.message}</p>}

        <input
          className={styles.input}
          type="password"
          {...register('password')}
          placeholder="Введите пароль"
        />
        {errors.password && <p className={styles.text}>{errors.password.message}</p>}

        <button className={styles.button}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
