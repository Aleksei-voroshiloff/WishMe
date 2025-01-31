import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';

export default function WishListPage(): React.JSX.Element {
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;
//   const {userid} = useParams()

  return (
    // {user.id === userid ? }


    <div className={style.razmap}>
      {wishListCards.map((list) => (
        <div className={style.card1} key={list.id}>
          <WishListCardUi list={list} />
        </div>
      ))}
    </div>
  );
}
