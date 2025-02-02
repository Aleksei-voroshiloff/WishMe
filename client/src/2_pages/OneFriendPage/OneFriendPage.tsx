import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { getFriendWishListThunk } from '../../5_entities/wishlist/lib/wishListThunk';
import { useParams } from 'react-router-dom';
import WishListCardUi from '../../5_entities/wishlist/ui/WishListCardUi';
import style from './OneFriendPage.module.scss'

export default function OneFriendPage(): React.JSX.Element {  
  const {id} = useParams()
  const friendId = Number(id)
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(store => store.user)
  const { wishListCards, loading, error } = useAppSelector((store) => store.wishlist);
  
  useEffect(() => {
    void dispatch(getFriendWishListThunk(friendId))
  }, [dispatch, friendId]);

  if (loading) return <div>Loading...</div>;
  if (error === 'error') return <div>{error}</div>;

  return (
  
  <div className={style.razmap}>
  {wishListCards.map((list) => (
    <WishListCardUi key={list.id} list={list} />
  ))}
</div>);
}
