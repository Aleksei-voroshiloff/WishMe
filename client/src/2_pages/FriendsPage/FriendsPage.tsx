import React from 'react';
import FriendCardWrapper from '../../4_features/friends/ui/FriendCardWrapper/FriendCardWrapper';

export default function FriendsPage(): React.JSX.Element {
  return (
    <main>
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
