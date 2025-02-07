import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { getFriendWishListThunk } from '../../5_entities/wishlist/lib/wishListThunk';
import { useNavigate, useParams } from 'react-router-dom';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './OneFriendPage.module.scss';
import { getOneUser } from '../../5_entities/user/lib/userThunks';
import FriendProfileComponent from '../../4_features/friends/ui/FriendProfileComponent/FriendProfileComponent';
import { Icon } from 'semantic-ui-react';
import { setActiveItem } from '../../5_entities/Navbar/model/navbarSlice';
import Loader from '../../3_widgets/loader/Loader';

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
  const showButton = useAppSelector((state) => state.redaction.showButton);

  if (error)  {
    dispatch(setActiveItem('Мои вишлисты'))
    void navigate('/')}

  return (
    <main>
      <div className={style.panel}>
        <div className={style.functionalPage}>
          <div className={style.redax}>
            <div>
              <Icon
                className={style.back_button}
                name="chevron left"
                size="large"
                onClick={() => navigate('/friends')}
              />
            </div>
          </div>
          <div className={style.user}>
            {oneUser ? <FriendProfileComponent friend={oneUser} /> : 'Информация не найдена'}
          </div>
        </div>
      </div>
      {oneUser && !loading ? (
        <>
          <h2>Вишлисты:</h2>
          <div className={style.razmap}>
            {wishListCards.map((list) => (
              <div key={list.id} onClick={() => handleCardClick(list.id)}>
                <WishListCardUi showButton={showButton} list={list} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
}
