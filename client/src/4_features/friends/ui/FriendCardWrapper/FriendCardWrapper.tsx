import React from 'react';
import {  useAppSelector } from '../../../../1_app/store/hooks';
import FriendCardComponent from '../FriendCardComponent/FriendCardComponent';
import style from './FriendCardWrapper.module.scss';

export default function FriendCardWrapper(): React.JSX.Element {
  const { friends } = useAppSelector((state) => state.friend);

  return (
    <>
      <div className={style.title} >Мои друзья:</div>
      {friends.length > 0 ? (<div className={style.list}>
        {friends.map((friend) => (
          <FriendCardComponent key={friend.id} friend={friend} />
        ))}
      </div>) : <p>Ваш список друзей пуст</p>}
    </>
  );
}
