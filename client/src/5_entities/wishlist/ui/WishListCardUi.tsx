import React from 'react';
import type { WishListObjectType } from '../types/types';
import { Icon } from 'semantic-ui-react';
import style from '../../../2_pages/WishListPage/WishListPage.module.scss';
import { useAppDispatch } from '../../../1_app/store/hooks';
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
      <div  onClick={() => handleCardClick(list.id)}>
        <h3>
          {list.title}
          <Icon name="share" color="purple" />
        </h3>
        <span>
          Дата мероприятия:
          <br />
          {list.date}
        </span>
      </div>
      <div></div>
      {showButton && (
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
