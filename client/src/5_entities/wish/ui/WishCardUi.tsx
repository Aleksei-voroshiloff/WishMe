import React, { useEffect } from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';
import { Button } from 'semantic-ui-react';

import { getPresInfo } from '../lib/wishThunk';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';

type Props = {
  wish: WishObjectType;
};

export default function WishCardUi({ wish }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reserv = useAppSelector((state) => state.wish.reserv);

  useEffect(() => {
    if (!reserv) {
      void dispatch(getPresInfo(wish.id));
    }
  }, [dispatch]);

  console.log(reserv);
  return (
    <div className={style.card1}>
      <div className={style.imagewrapper}>
        <img src={wish.file} />
      </div>
      <div>
        <h4>{wish.title}</h4>
        <h2>{wish.price} ₽</h2>
      </div>
      <div>
        <Button>{reserv === null ? 'забронировать' : 'Занято'}</Button>
      </div>
    </div>
  );
}
