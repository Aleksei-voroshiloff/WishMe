import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishCardUi from '../../5_entities/wish/ui/WishCardUi';
import { getWish } from '../../5_entities/wish/lib/wishThunk';
import style from './OneWishListPage.module.scss';

export default function OneWishListPage(): React.ReactElement {
  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);
  const { wishCards } = useAppSelector((state) => state.wish);

  useEffect(() => {
    void dispatch(getOneWishList(Number(listId)));
    void dispatch(getWish(Number(listId)))
  }, [dispatch, listId]);
//   console.log(listId);
//   console.log(wishList);

  const filteredWishCards = wishCards.filter((wish) => wish.wishListId === Number(listId));

  return (
    <div>
      <h3>Вишлист: {wishList?.title}</h3>
      <div>
        {filteredWishCards.length > 0 ? (
          filteredWishCards.map((wish) => (
            <div key={wish.id}>
              <WishCardUi wish={wish} />
            </div>
          ))
        ) : (
          <p>Подарки не найдены.</p>
        )}
      </div>
    </div>
  );
}
