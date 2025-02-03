import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { getFriendWishListThunk } from '../../5_entities/wishlist/lib/wishListThunk';
import { useParams } from 'react-router-dom';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './OneFriendPage.module.scss';
import { getOneUser } from '../../5_entities/user/lib/userThunks';
import FriendProfileComponent from '../../4_features/friends/ui/FriendProfileComponent/FriendProfileComponent';

export default function OneFriendPage(): React.JSX.Element {
  const { id } = useParams();
  const friendId = Number(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getFriendWishListThunk(friendId));
    void dispatch(getOneUser(friendId));
  }, [dispatch, friendId]);

  const { oneUser, error } = useAppSelector((store) => store.user);
  const { wishListCards, loading } = useAppSelector((store) => store.wishlist);

  if (error) return <div>{error}</div>;

  return (
    <main>
      {oneUser && !loading ? (
        <>
          <FriendProfileComponent friend={oneUser} />
          <div className={style.razmap}>
            {wishListCards.map((list) => (
              <WishListCardUi key={list.id} list={list} />
            ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
