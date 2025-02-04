import React, { useEffect } from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';
import { Button } from 'semantic-ui-react';

import { getPresInfo, toggleReservation } from '../lib/wishThunk';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { setIsLoading } from '../model/wishSlice';
import { PresentObjSchema } from '../../wishlist/types/types';

type Props = {
  wish: WishObjectType;
};

export default function WishCardUi({ wish }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reservation = useAppSelector((state) => state.wish.reservations[wish.id]);
  const isLoading = useAppSelector((state) => state.wish.isLoading);
  console.log(wish.id, 'wish.id');
  const isReserved1 = useAppSelector((state) => state.wish.reservations[wish.id]);
  // console.log(isReserved, 'isReservedisReservedisReserved');
  useEffect(() => {
    if (!reservation) {
      void dispatch(getPresInfo(wish.id));
    }
  }, [dispatch, reservation]);

  const handleReserveClick = async (): Promise<void> => {
    dispatch(setIsLoading());
    try {
      console.log(isReserved1, 'isReserved1');
      const isReserved = PresentObjSchema.parse(isReserved1);
      await dispatch(toggleReservation(isReserved));
    } catch (error) {
      console.error('Ошибка бронирования:', error);
      // Можно добавить уведомление для пользователя
    } finally {
      dispatch(setIsLoading());
    }
  };

  // console.log(reservation);
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
        <Button loading={isLoading} disabled={isLoading} onClick={handleReserveClick}>
          {reservation ? 'Занято' : 'Забронировать'}
        </Button>
      </div>
    </div>
  );
}
