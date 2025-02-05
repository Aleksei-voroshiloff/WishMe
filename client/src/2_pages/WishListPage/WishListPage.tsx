import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';
import { getWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { Button, Icon } from 'semantic-ui-react';

import ModalUi from '../../4_features/modal_addList/modalSlice/ModalUi';
import { openModal } from '../../5_entities/modal_window/modalSlice';

export default function WishListPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getWishList());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;

  const handleCardClick = (id: number): void => {
    void navigate(`/wishlist/${String(id)}`);
  };

  return (
    <main className={style.main}>
      <div style={{ display: 'flex', margin: '50px' }}>
        <>
          <Button>
            {' '}
            <Icon name="add" size="huge" onClick={() => dispatch(openModal())} />
          </Button>
          <h1 style={{ marginLeft: '100px' }}>Добавить</h1>
        </>
      </div>
      <div className={style.razmap}>
        {wishListCards.map((list) => (
          <div key={list.id} onClick={() => handleCardClick(list.id)}>
            <WishListCardUi list={list} />
          </div>
        ))}
      </div>
      <ModalUi />
    </main>
  );
}
