import React from 'react';
import style from './FriendCardComponent.module.scss';
import { NavLink } from 'react-router-dom';

type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function FriendCardComponent({ friend }: FriendProp): React.JSX.Element {
  return (
    <NavLink to='#'>
      <div className={style.card_wrapper}>
        {friend.avatar ? (
          <img className={style.image} src={friend.avatar} alt="foto" />
        ) : (
          <img
            className={style.image}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycpUJ3ZthUXax2SBqN96C4xh1C4tyA7XbPA&s"
            alt="foto"
          />
        )}
        <div className={style.info_wrapper}>
          <h2>{friend.name}</h2>
          <p>День рождения: {String(friend.birthday)}</p>
        </div>
        <button>Удалить из друзей</button>
      </div>
    </NavLink>
  );
}
