import React, { useEffect } from 'react';
import FriendCardWrapper from '../../4_features/friends/ui/FriendCardWrapper/FriendCardWrapper';
import style from './FriendsPage.module.scss';
import RequestToMeWrapper from '../../4_features/friends/ui/RequestToMeWrapper/RequestToMeWrapper';
import MyRequestWrapper from '../../4_features/friends/ui/MyRequestWrapper/MyRequestWrapper';
import {
  getAllFriends,
  getAllMyRequestsThunk,
  getAllRequestsToMeThunk,
} from '../../4_features/friends/lib/friendsThunk';
import { useAppDispatch } from '../../1_app/store/hooks';

export default function FriendsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const friends = dispatch(getAllFriends());
    const requestsToMe = dispatch(getAllRequestsToMeThunk());
    const myRequests = dispatch(getAllMyRequestsThunk());
    Promise.all([friends, requestsToMe, myRequests]).catch(console.error);
  }, [dispatch]);

  return (
    <main className={style.main}>
      <section>
        <RequestToMeWrapper />
      </section>
      <section>
        <MyRequestWrapper />
      </section>
      <section>
        <FriendCardWrapper />
      </section>
    </main>
  );
}
