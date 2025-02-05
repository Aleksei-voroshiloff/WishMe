import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { getAllFriends } from '../../lib/friendsThunk';
import FriendCardComponent from '../FriendCardComponent/FriendCardComponent';
import style from './FriendCardWrapper.module.scss';

export default function FriendCardWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector((state) => state.friend);

  useEffect(() => {
    void dispatch(getAllFriends());
  }, [dispatch]);

  return (
    <>
      <h3>Мои друзья</h3>
      <div className={style.list}>
        {friends.map((friend) => (
          <FriendCardComponent key={friend.id} friend={friend} />
        ))}
      </div>
    </>
  );
}
