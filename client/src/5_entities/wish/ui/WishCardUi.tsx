import React, { useEffect } from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';
import { Button, Icon } from 'semantic-ui-react';

import { deleteWish,getPresInfo,toggleReservation } from '../lib/wishThunk';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { openEditModal } from '../model/wishSlice';
import { Link } from 'react-router-dom';

type Props = {
  wish: WishObjectType;
  showButton: boolean;
};

export default function WishCardUi({ wish, showButton }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isBusy = useAppSelector((state) => state.wish.isBusy);
  const reservation = useAppSelector((state) => state.wish.reservations);

  
  useEffect(() => {
    if (!reservation) {
      void dispatch(getPresInfo(wish.id));
    }
  }, [dispatch, wish.id]);

  const handleReserveClick = async (wishId: number): Promise<void> => {
    try {
      if (reservation) {
        // Удаляем запись
        await dispatch(deleteWish(reservation.id));
      } else {
        // Создаем запись
        await dispatch(toggleReservation(wishId));
      }
    } catch (error) {
      console.error('Ошибка бронирования:', error);
    } 
  };

  const handleDeleteClick = (wishId: number): void => {
    try {
      void dispatch(deleteWish(wishId));
    } catch (error) {
      console.error('Ошибка удаления:', error);
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
        <Button as={Link} to={wish.wishUrl} color="vk">
          Перейти в магазин
        </Button>
        <h2>{wish.price} ₽</h2>
      </div>
      <div>
        <Button onClick={() => handleReserveClick(wish.id)}>{reservation ? 'Занято' : 'Забронировать'}</Button> 
  
      </div>
      <div>
        {showButton && (
          <>
            <Icon
              className={style.edit}
              onClick={() => dispatch(openEditModal(wish))}
              size="large"
              name="pencil alternate"
              color="black"
            />
            <Icon
              className={style.del}
              onClick={() => handleDeleteClick(wish.id)}
              color="red"
              name="x"
              size="big"
            />
          </>
        )}
      </div>
    </div>
  );
}
