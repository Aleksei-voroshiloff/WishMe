import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishCardUi from '../../5_entities/wish/ui/WishCardUi';
import { getWish } from '../../5_entities/wish/lib/wishThunk';
import style from './OneWishListPage.module.scss';
import { Checkbox, Icon} from 'semantic-ui-react';
import ModalUiWish from '../../4_features/modal_addOneWish/modalSlice/ModalUiWish';
import { openModal } from '../../5_entities/modal_window/modalSlice';
import { setShowButton } from '../../5_entities/delete/redactionSlice';
import ModalUiWishEdit from '../../4_features/modal_edit/ModalUiWishEdit';
import { getUserByWishlistThunk } from '../../5_entities/user/lib/userThunks';
import FriendProfileComponent from '../../4_features/friends/ui/FriendProfileComponent/FriendProfileComponent';

export default function OneWishListPage(): React.ReactElement {
  const { listId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const wishList = useAppSelector((state) => state.wishlist.oneWishList);
  const { wishCards } = useAppSelector((state) => state.wish);
  const showButton = useAppSelector((state) => state.redaction.showButton);
  const { oneUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    void dispatch(getOneWishList(Number(listId)));
    void dispatch(getWish(Number(listId)));
    void dispatch(getUserByWishlistThunk(Number(listId)));
  }, [dispatch, listId]);

  console.log(oneUser, 123444444);

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
                size="large"
                onClick={() => navigate(-1)}
              />
            </div>

            <div style={{margin:'10px'}}>
              Режим редакции 
              <Checkbox
                name="read"
                value={1}
                checked={showButton}
                onClick={() => dispatch(setShowButton())}
                label={showButton}
                toggle
              />
            </div>
          </div>
        ) : (
          <>
            <div>
              <Icon
                className={style.back_button}
                name="chevron left"
                size="huge"
                onClick={() => navigate(-2)}
              />
            </div>
            <FriendProfileComponent friend={oneUser} />
          </>
        )}
      </div>

      <h3>Вишлист: {wishList?.title}</h3>
      <div className={style.razmap}>
        {user?.id === wishList?.userId ? (
          <div className={style.gift_box} onClick={() => dispatch(openModal())}>
            <div className={style.plus}></div>
            <div className={style.gift}>🎁</div>
          </div>
        ) : null}
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
