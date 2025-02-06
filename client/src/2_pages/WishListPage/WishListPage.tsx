import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';
import { getWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import {  Checkbox, Segment } from 'semantic-ui-react';

import ModalUiList from '../../4_features/modal_addList/modalSlice/ModalUiList';
import { openModal } from '../../5_entities/modal_window/modalSlice';
import { setShowButton } from '../../5_entities/delete/redactionSlice';
import ModalEditListUi from '../../4_features/modal_edit/modalEditListUi';

export default function WishListPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);
  const showButton = useAppSelector((state) => state.redaction.showButton);



  useEffect(() => {
    void dispatch(getWishList());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;

  return (
    <main className={style.main}>
      <div style={{ display: 'flex', margin: '50px', gap: '50px' }}>
        <>
          <div className={style.gift_box} onClick={() => dispatch(openModal())}>
            <div className={style.plus}></div>
            <div className={style.gift}>🎁</div>
          </div>
          <Segment >
            <Checkbox 
              name="read"
              value={1}
              checked={showButton}
              onClick={() => dispatch(setShowButton())}
              label={showButton ? 'Редактирование включено' : 'Редактирование выключено'}
              toggle
            />
          </Segment>
        </>
      </div>
      <div className={style.razmap}>
        {wishListCards.map((list) => (
          <div key={list.id}>
            <WishListCardUi list={list} showButton={showButton} />
          </div>
        ))}
      </div>
      <ModalUiList/>
      <ModalEditListUi/>
    </main>
  );
}
