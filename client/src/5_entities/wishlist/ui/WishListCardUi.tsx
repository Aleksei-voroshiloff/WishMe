import React from 'react';
import type { WishListObjectType } from '../types/types';
import { Icon } from 'semantic-ui-react';
import style from '../../../2_pages/WishListPage/WishListPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { deleteWishList } from '../lib/wishListThunk';
import { useNavigate } from 'react-router-dom';
import { openEditListModal } from '../model/wishListSlice';

type Props = {
  list: WishListObjectType;
  showButton: boolean;
};

export default function WishListCardUi({ list, showButton }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.data);

  const handleDeleteListClick = (listId: number): void => {
    try {
      void dispatch(deleteWishList(listId));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };
  const handleCardClick = (id: number): void => {
    void navigate(`/wishlist/${String(id)}`);
  };

  return (
    <div className={style.card1}>
      <div className={style.content} onClick={() => handleCardClick(list.id)}>
        <div className={style.title}>{list.title}</div>
        <div className={style.date}>
          Дата мероприятия:
          <br />
          {list.date}
        </div>
      </div>
      {user?.id === list.userId && showButton && (
        <div className={style.redaction}>
          <Icon
            className={style.edit}
            onClick={() => dispatch(openEditListModal(list))}
            size="large"
            name="pencil alternate"
            color="black"
          />
          <Icon
            className={style.del}
            onClick={() => handleDeleteListClick(list.id)}
            color="red"
            name="x"
            size="big"
          />
        </div>
      )}
    </div>
  );
}
