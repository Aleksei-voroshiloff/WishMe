import React, { useEffect } from 'react';
import type { WishObjectType } from '../types/types';
import style from '../../../2_pages/OneWishListPage/OneWishListPage.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { deleteReservation, deleteWish, getPresInfo, postReservation } from '../lib/wishThunk';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { openEditModal } from '../model/wishSlice';
import { Link } from 'react-router-dom';
import { getAllPresent, getUserIdByWishIdThunk } from '../../present/lib/presentThunk';

type Props = {
  wish: WishObjectType;
  showButton: boolean;
  IsFriends: boolean;
  // wishList: WishListObjectType;
};

export default function WishCardUi({ wish, showButton, IsFriends }: Props): React.JSX.Element {
  const formatPrice = (wishPrice: string): string =>
    wishPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const allReservations = useAppSelector((state) => state.wish.allReservations);
 const {userReservedId} = useAppSelector((state) => state.present);

  // const {id} = useParams()
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);

  useEffect(() => {
    void dispatch(getPresInfo(wish.id));
    void dispatch(getUserIdByWishIdThunk(wish.id))
  }, [dispatch, wish.id]);

console.log(userReservedId)

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
  
    } catch (err) {
      console.error('Ошибка бронирования:', err);
    }
  };

  const handleDeleteClick = (wishId: number): void => {
    try {
      void dispatch(deleteWish(wishId));
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  return (
    <div className={style.card1}>
      <div className={style.imagewrapper}>
        <img src={wish.file} />
      </div>
      <div className={style.text}>
        <div className={style.title}>{wish.title}</div>
        <div className={style.price}>{`${formatPrice(wish.price.toString())} руб`}</div>
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
        {user?.id !== wishList?.userId && IsFriends  && (
          <Button onClick={() => handleReserveClick(wish.id)}>
            {allReservations[wish.id] ? 'Снять бронь' : 'Забронировать'}
          </Button>
        )}
      </div>
      <div>
        {showButton && user?.id === wishList?.userId && (
          <div className={style.delete}>
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
          </div>
        )}
      </div>
    </div>
  );
}
