import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';
import { getWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { Checkbox } from 'semantic-ui-react';
import ModalUiList from '../../4_features/modal_addList/modalSlice/ModalUiList';
import { openModal } from '../../5_entities/modal_window/modalSlice';
import { setShowButton } from '../../5_entities/delete/redactionSlice';
import ModalEditListUi from '../../4_features/modal_edit/modalEditListUi';
import Loader from '../../3_widgets/loader/Loader';

export default function WishListPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);
  const showButton = useAppSelector((state) => state.redaction.showButton);

  useEffect(() => {
    void dispatch(getWishList());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error === 'error') return <div>{error}</div>;

  return (
    <main className={style.main}>
      <div className={style.panel}>
        <div className={style.check}>
          <div>Режим редакции:</div>
        </div>
        <div className={style.redaxToggle}>
          <div>
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
      </div>
      <div className={style.razmap}>
        <div className={style.gift_box} onClick={() => dispatch(openModal())}>
          <div className={style.plus}></div>
          <div className={style.gift}>🎁</div>
        </div>
        {wishListCards.map((list) => (
          <div key={list.id}>
            <WishListCardUi list={list} showButton={showButton} />
          </div>
        ))}
      </div>
      <ModalUiList />
      <ModalEditListUi />
    </main>
  );
}
