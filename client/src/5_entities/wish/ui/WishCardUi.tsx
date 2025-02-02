import React from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';

type Props = {
  wish: WishObjectType;
};

export default function WishCardUi({ wish }: Props): React.JSX.Element {
  return (
    <div className={style.card1}>
      <div className={style.imagewrapper}>
        <img src={wish.file} />
      </div>
      <div>
        <h4>{wish.title}</h4>
        <h2>{wish.price} ₽</h2>
      </div>
    </div>
  );
}
