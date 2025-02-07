import React from 'react';
import type { WishListObjectType } from '../types/types';
import { Icon } from 'semantic-ui-react';
import style from '../../../2_pages/WishListPage/WishListPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';
import { deleteWishList } from '../lib/wishListThunk';
import { useNavigate } from 'react-router-dom';
import { openEditListModal } from '../model/wishListSlice';
import { TelegramShareButton, WhatsappShareButton } from 'react-share';
import { GridColumn, Grid, Popup } from 'semantic-ui-react';

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

  const shareUrl = `${window.location.origin}/wishlist/${String(list.id)}`;

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
          <div className={style.share}></div>
        </div>
      )}
      {<div>
        <Popup wide trigger={<button className={style.batn}>Поделиться</button>} on="click">
          <Grid divided columns="equal">
            <GridColumn>
              <Popup
                trigger={
                  <TelegramShareButton
                    url={shareUrl}
                    title={`Посмотрите мой вишлист: ${list.title}`}
                  >
                    <Icon color="blue" name="telegram" size="big" />
                  </TelegramShareButton>
                }
                content="Поделиться через телеграмм"
              />
            </GridColumn>
            <GridColumn>
              <Popup
                trigger={
                  <WhatsappShareButton
                    url={shareUrl}
                    title={`Посмотрите мой вишлист: ${list.title}`}
                  >
                    <Icon color="green" name="whatsapp" size="big" />
                  </WhatsappShareButton>
                }
                content="Поделиться через WhatsUp"
              />
            </GridColumn>
          </Grid>
        </Popup>
      </div>}
    </div>
  );
}
