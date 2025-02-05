import React, { useEffect } from 'react';
import FriendCardWrapper from '../../4_features/friends/ui/FriendCardWrapper/FriendCardWrapper';
import style from './FriendsPage.module.scss';
import ModalFindFriends from '../../3_widgets/ModalFindFriends/ModalFindFriends';
import { openWindow } from '../../4_features/friends/model/friendsSlice';
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
        {/* <input type="text" /> */}
        <div>
          <button onClick={() => dispatch(openWindow())}>+</button>
          <p>Добавить друга</p>
        </div>
      </section>
      <div>
        <RequestToMeWrapper />
      </div>
      <div>
        <MyRequestWrapper />
      </div>
      <FriendCardWrapper />
      <ModalFindFriends />
    </main>
  );
}
