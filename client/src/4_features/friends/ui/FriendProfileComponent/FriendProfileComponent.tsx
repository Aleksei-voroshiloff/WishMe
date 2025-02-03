import React from 'react';
import style from './FriendProfileComponent.module.scss';


type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  } | null;
};

export default function FriendProfileComponent({ friend }: FriendProp): React.JSX.Element {
  return (
    <>
      <div className={style.card_wrapper}>
          {friend?.avatar ? (
            <img className={style.image} src={friend.avatar} alt="foto" />
          ) : (
            <img
              className={style.image}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycpUJ3ZthUXax2SBqN96C4xh1C4tyA7XbPA&s"
              alt="foto"
            />
          )}
        <div className={style.info_wrapper}>
            <h2>{friend?.name}</h2>
          <p>День рождения: {String(friend?.birthday)}</p>
        </div>
      </div>
    </>
  );
}
