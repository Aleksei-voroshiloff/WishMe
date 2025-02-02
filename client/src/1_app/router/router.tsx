import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../../2_pages/Layout';
import RegisterPage from '../../2_pages/RegisterPage/RegisterPage';
import LoginPage from '../../2_pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../../2_pages/NotFoundPage/NotFoundPage';
import WishListPage from '../../2_pages/WishListPage/WishListPage';
import FriendsPage from '../../2_pages/FriendsPage/FriendsPage';
import OneWishListPage from '../../2_pages/OneWishListPage/OneWishListPage';

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
            path: '/myList',
            element: <WishListPage />,
          },
          {
            path: '/wishlist/:listId',
            element: <OneWishListPage />,
          },
          {
            path: '/myFriends',
            element: <FriendsPage />,
          },
        ],
      },
      { path: '/register', element: <RegisterPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
