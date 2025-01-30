import { fetchUser, loginHandler, logoutHandler, submitHandler } from '../lib/userThunks';
import { useEffect } from 'react';
import type { LoginCredentials, RegisterFormData, UseUserReturnType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';

export const useUser = (): UseUserReturnType => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  return {
    user: { data, status, error },
    error,
    loginHandler: (loginData: LoginCredentials) => dispatch(loginHandler(loginData)),
    logoutHandler: () => dispatch(logoutHandler()),
    submitHandler: (registerData: RegisterFormData) => dispatch(submitHandler(registerData)),
  };
};
