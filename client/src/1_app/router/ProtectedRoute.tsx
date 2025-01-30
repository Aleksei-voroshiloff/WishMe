import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RingLoader } from 'react-spinners';

type ProtectedRouteProps = {
  allowedStatuses: ('loading' | 'logged' | 'guest')[];
  redirectTo: string;
  children?: React.ReactNode; // Добавляем поддержку children
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedStatuses,
  redirectTo,
  children,
}) => {
  const userStatus = useAppSelector((state) => state.user.status);

  if (userStatus === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
        <RingLoader color="#1d5ba3" size={150} speedMultiplier={1} />
      </div>
    );
  }

  // Если статус не входит в allowedStatuses, перенаправляем на redirectTo
  if (!allowedStatuses.includes(userStatus)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Если статус подходит, отображаем children или Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
