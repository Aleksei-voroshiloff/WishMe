import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { getAllFriends } from '../../lib/friendsThunk';
import FriendCardComponent from '../FriendCardComponent/FriendCardComponent';

export default function FriendCardWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector((state) => state.friend);

  useEffect(() => {
    void dispatch(getAllFriends());
  }, [dispatch]);

  return (
    <div>
      {friends.map((friend) => (
        <FriendCardComponent key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
