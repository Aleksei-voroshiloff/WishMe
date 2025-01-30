import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../../2_pages/Layout';
import StartPage from '../../2_pages/StartPage/StartPage';
import RegisterPage from '../../2_pages/RegisterPage/RegisterPage';
import LoginPage from '../../2_pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../../2_pages/NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      {
        element: <ProtectedRoute allowedStatuses={['logged']} redirectTo="/login" />,
        children: [
          {
            path: '/home',
            element: <StartPage />,
          },
        ],
      },
      { path: '/register', element: <RegisterPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
