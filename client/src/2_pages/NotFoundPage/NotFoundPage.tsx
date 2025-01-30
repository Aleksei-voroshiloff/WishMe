import React from 'react';
import { Link } from 'react-router-dom';
import { setActiveItem } from '../../5_entities/Navbar/model/navbarSlice';
import style from './NotFoundPage.module.scss';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className={style.notFound}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link onClick={() => setActiveItem('Home')} className={style.linka} to="/home">
        Вернуться на главную
      </Link>
    </div>
  );
}
