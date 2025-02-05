import React from 'react';
import FriendCardWrapper from '../../4_features/friends/ui/FriendCardWrapper/FriendCardWrapper';
import style from './FriendsPage.module.scss';
import ModalFindFriends from '../../3_widgets/ModalFindFriends/ModalFindFriends';
import { openWindow } from '../../4_features/friends/model/friendsSlice';
import { useDispatch } from 'react-redux';

export default function FriendsPage(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <main className={style.main}>
      <section>
        <input type="text" />
        <div>
          <button onClick={() => dispatch(openWindow())}>+</button>
          <p>Добавить друга</p>
        </div>
      </section>
      <FriendCardWrapper />
      <ModalFindFriends />
    </main>
  );
}
