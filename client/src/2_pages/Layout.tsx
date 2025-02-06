import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../3_widgets/NavBar/NavBar';
import style from './Layout.module.scss';
import ModalPage from '../4_features/modal_window/ModalPage';
import { useAppSelector } from '../1_app/store/hooks';
import Loader from '../3_widgets/loader/Loader';
import { ToastContainer } from 'react-toastify';

export default function Layout(): React.JSX.Element {
  const status = useAppSelector((state) => state.user.status);

  if (status === 'loading') return <Loader />;
  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.wishme}>WishMe 🎁</div>
      </div>
      <div className={style.home}>
        <NavBar />
        <div className={style.str}>
          <Outlet />
        </div>
        <ModalPage />
        <ToastContainer />
      </div>
    </div>
  );
}
