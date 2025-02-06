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
            <img
              className={style.image}
              src={`http://localhost:3000/${friend.avatar}`}
              alt="foto"
            />
          ) : (
            <img className={style.image} src="/avatar.png" alt="foto" />
          )}
        <div className={style.info_wrapper}>
            <h2>{friend?.name}</h2>
          <p>День рождения: {String(friend?.birthday)}</p>
        </div>
      </div>
    </>
  );
}
