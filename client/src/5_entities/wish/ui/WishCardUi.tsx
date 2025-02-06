import React, { useEffect } from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { deleteReservation, deleteWish, getPresInfo, postReservation } from '../lib/wishThunk';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { openEditModal } from '../model/wishSlice';
import { Link } from 'react-router-dom';
import { getAllPresent } from '../../present/lib/presentThunk';

type Props = {
  wish: WishObjectType;
  showButton: boolean;
  // wishList: WishListObjectType;
};

export default function WishCardUi({ wish, showButton }: Props): React.JSX.Element {
  const formatPrice = (wishPrice: string): string =>
    wishPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const allReservations = useAppSelector((state) => state.wish.allReservations);
  // const {id} = useParams()
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);

  useEffect(() => {
    void dispatch(getPresInfo(wish.id));
  }, [dispatch, wish.id]);

  const handleReserveClick = async (wishId: number): Promise<void> => {
    try {
      if (allReservations[wish.id]) {
        // Удаляем запись
        await dispatch(deleteReservation(wishId));
      } else {
        // Создаем запись
        await dispatch(postReservation(wishId));
      }
      await dispatch(getPresInfo(wish.id));
      await dispatch(getAllPresent());
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

  return (
    <div className={style.card1}>
      <div className={style.imagewrapper}>
        <img src={wish.file} />
      </div>
      <div className={style.text}>
        <div className={style.title} >{wish.title}</div>
        <div className={style.price} >{`${formatPrice(wish.price.toString())} руб`}</div>
        <Button
          primary
          as={Link}
          to={wish.wishUrl}
          icon="cart arrow down"
          label={{ as: 'a', basic: true, pointing: 'right', content: 'Перейти к товару' }}
          labelPosition="left"
        />
      </div>
      <div>
        {user?.id !== wishList?.userId && (
          <Button onClick={() => handleReserveClick(wish.id)}>
            {allReservations[wish.id] ? 'Снять бронь' : 'Забронировать'}
          </Button>
        )}
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
