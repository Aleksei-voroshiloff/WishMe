import { useAppSelector } from '../../1_app/store/hooks';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';

export default function WishListPage(): React.JSX.Element {
  const { wishListCards, error, loading } = useAppSelector((state) => state.wishlist);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;

  return (
    <div>
      {wishListCards.map((list) => (
        <div key={list.id}>
          <WishListCardUi list={list} />
        </div>
      ))}
    </div>
  );
}
