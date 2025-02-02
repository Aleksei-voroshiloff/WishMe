import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';
import { getWishList } from '../../5_entities/wishlist/lib/wishListThunk';

export default function WishListPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();

useEffect(()=> {
  void dispatch(getWishList())
}, [dispatch])

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;

  const handleCardClick = (id: number): void => {
   void  navigate(`/wishlist/${String(id)}`);
  };

  return (
    <main className={style.main}>
      <div style={{ display: 'flex', margin: '50px' }}>
        {user?.id === wishListCards[0]?.userId ? (
          <>
            <h1>+</h1>
            <h1 style={{ marginLeft: '100px' }}>Добавить</h1>
          </>
        ) : null}
      </div>
      <div className={style.razmap}>
        {wishListCards.map((list) => (
          <div key={list.id} onClick={() => handleCardClick(list.id)} >
            <WishListCardUi list={list} />
          </div>
        ))}
      </div>
    </main>
  );
}