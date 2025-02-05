import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishCardUi from '../../5_entities/wish/ui/WishCardUi';
import { getWish } from '../../5_entities/wish/lib/wishThunk';
import style from './OneWishListPage.module.scss';
import { Button, Checkbox, Icon, Segment } from 'semantic-ui-react';
import ModalUiWish from '../../4_features/modal_addOneWish/modalSlice/ModalUiWish';
import { openModal } from '../../5_entities/modal_window/modalSlice';
import { setShowButton } from '../../5_entities/delete/redactionSlice';
import ModalUiWishEdit from '../../4_features/modal_edit/ModalUiWishEdit';

export default function OneWishListPage(): React.ReactElement {
  const { listId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);
  const { wishCards } = useAppSelector((state) => state.wish);
  const showButton = useAppSelector((state) => state.redaction.showButton);

  useEffect(() => {
    void dispatch(getOneWishList(Number(listId)));
    void dispatch(getWish(Number(listId)));
  }, [dispatch, listId]);

  const filteredWishCards = wishCards.filter((wish) => wish.wishListId === Number(listId));

  return (
    <main className={style.main}>
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        {user?.id === wishList?.userId ? (
          <div className={style.functionalPage}>
            <div>
              <Icon
                className={style.back_button}
                name="chevron left"
                size="huge"
                onClick={() => navigate(-1)}
              />
            </div>

            <div>
              <Segment style={{ marginLeft: '100px' }}>
                <Checkbox
                  name="read"
                  value={1}
                  checked={showButton}
                  onClick={() => dispatch(setShowButton())}
                  label={showButton ? 'Редактирование включено' : 'Редактирование выключено'}
                  toggle
                />
              </Segment>
            </div>
          </div>
        ) : null}
      </div>

      <h3>Вишлист: {wishList?.title}</h3>
      <div className={style.razmap}>
        <div className={style.gift_box} onClick={() => dispatch(openModal())}>
          <div className={style.plus}></div>
          <div className={style.gift}>🎁</div>
        </div>
        {filteredWishCards.length > 0 ? (
          filteredWishCards.map((wish) => (
            <div key={wish.id}>
              <WishCardUi wish={wish} showButton={showButton} />
            </div>
          ))
        ) : (
          <p>Подарки не найдены.</p>
        )}
        <ModalUiWish />
        <ModalUiWishEdit />
      </div>
    </main>
  );
}
