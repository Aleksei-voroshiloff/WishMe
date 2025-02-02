import React from 'react';
import FriendCardWrapper from '../../4_features/friends/ui/FriendCardWrapper/FriendCardWrapper';
import style from './FriendsPage.module.scss'

export default function FriendsPage(): React.JSX.Element {
  return (
    <main className={style.main}>
      <section>
        <input type="text" />
        <div>
          <button>+</button>
          <p>Добавить друга</p>
        </div>
      </section>
      <FriendCardWrapper />
    </main>
  );
}
