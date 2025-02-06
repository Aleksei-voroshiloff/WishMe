import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { getFriendWishListThunk } from '../../5_entities/wishlist/lib/wishListThunk';
import { useNavigate, useParams } from 'react-router-dom';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './OneFriendPage.module.scss';
import { getOneUser } from '../../5_entities/user/lib/userThunks';
import FriendProfileComponent from '../../4_features/friends/ui/FriendProfileComponent/FriendProfileComponent';
import { Icon } from 'semantic-ui-react';

export default function OneFriendPage(): React.JSX.Element {
  const { id } = useParams();
  const friendId = Number(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    void dispatch(getFriendWishListThunk(friendId));
    void dispatch(getOneUser(friendId));
  }, [dispatch, friendId]);

  
  const handleCardClick = (wishlisId: number): void => {
    void navigate(`/wishlist/${String(wishlisId)}`);
  };

  const { oneUser, error } = useAppSelector((store) => store.user);
  const { wishListCards, loading } = useAppSelector((store) => store.wishlist);

  if (error) return <div className={style.error} onClick={()=> void navigate('/')}>Перейти на страницу входа</div>;

  return (
    <main>
      <div>
              <Icon
                className={style.back_button}
                name="chevron left"
                size="huge"
                onClick={() => navigate(-1)}
              />
            </div>
      {oneUser && !loading ? (
        <>
          <FriendProfileComponent friend={oneUser} />
          <h2>Вишлисты:</h2>
          <div className={style.razmap}>
        {wishListCards.map((list) => (
          <div key={list.id} onClick={() => handleCardClick(list.id)}>
            <WishListCardUi list={list} />
          </div>
        ))}
      </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
