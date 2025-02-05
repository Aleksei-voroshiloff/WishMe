import React from 'react';
import style from './PresentPage.module.scss';
import { useAppSelector } from '../../1_app/store/hooks';
import Loader from '../../3_widgets/loader/Loader';
import PresentFriendUi from '../../5_entities/present/ui/PresentFriendUi';

export default function PresentPage(): React.JSX.Element {
  const { loading, presents } = useAppSelector((state) => state.present);
console.log(presents)
  if (loading) return <Loader />;
  if (presents !== null)
    return (
      <div className={style.str}>
        <div className={style.first_div}></div>
        {presents.result.map((user) =>
          user.Wishlists.map((wishlist) => {
            const wishP = presents.wishes.filter((wish) => wishlist.id === wish.wishListId);
            console.log(wishP)
            return (
              <>
                {wishP.map((wish) => (
                  <div key={user.id}>
                    <PresentFriendUi user={user} wish={wish} wishlist={wishlist} />
                  </div>
                ))}
              </>
            );
          }),
        )}
      </div>
    );
  return <></>;
}
