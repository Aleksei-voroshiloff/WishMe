import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishCardUi from '../../5_entities/wish/ui/WishCardUi';
import { getWish } from '../../5_entities/wish/lib/wishThunk';
import style from './OneWishListPage.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import ModalUiWish from '../../4_features/modal_addOneWish/modalSlice/ModalUiWish';
import { openModal } from '../../5_entities/modal_window/model/modalSlice';

export default function OneWishListPage(): React.ReactElement {
  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);
  const { wishCards } = useAppSelector((state) => state.wish);

  useEffect(() => {
    void dispatch(getOneWishList(Number(listId)));
    void dispatch(getWish(Number(listId)));
  }, [dispatch, listId]);

  const filteredWishCards = wishCards.filter((wish) => wish.wishListId === Number(listId));

  return (
    <main className={style.main}>
      <div style={{ display: 'flex', margin: '50px' }}>
        {user?.id === wishList?.userId ? (
          <>
            <Button>
              <Icon name="add" size="huge" onClick={() => dispatch(openModal())} />
            </Button>
            <h1 style={{ marginLeft: '100px' }}>Добавить</h1>
          </>
        ) : null}
      </div>

      <h3>Вишлист: {wishList?.title}</h3>
      <div className={style.razmap}>
        {filteredWishCards.length > 0 ? (
          filteredWishCards.map((wish) => (
            <div key={wish.id}>
              <WishCardUi wish={wish} />
            </div>
          ))
        ) : (
          <p>Подарки не найдены.</p>
        )}
        <ModalUiWish />
      </div>
    </main>
  );
}
