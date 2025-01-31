import { useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './WishListPage.module.scss';

export default function WishListPage(): React.JSX.Element {
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.user.data);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;
  //   const {userid} = useParams()

  return (
    // {user.id === userid ? div}
    <div>
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
          <WishListCardUi key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
