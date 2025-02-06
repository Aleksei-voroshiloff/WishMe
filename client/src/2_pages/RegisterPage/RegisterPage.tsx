import { useAppDispatch } from '../../1_app/store/hooks';
import { registerSchema, type RegisterFormData } from '../../5_entities/user/types/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.scss';
import { submitHandler } from '../../5_entities/user/lib/userThunks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import InputMask, { Props as InputMaskProps } from 'react-input-mask';
type InputProps = InputMaskProps & React.InputHTMLAttributes<HTMLInputElement>;


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
    await navigate('/myList');
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

        <button className={styles.button}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
