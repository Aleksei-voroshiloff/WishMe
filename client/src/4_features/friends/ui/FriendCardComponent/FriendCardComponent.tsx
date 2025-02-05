import React from 'react';
import style from './FriendCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { addFriendThunk, deleteFriendThunk } from '../../lib/friendsThunk';
import { closeWindow } from '../../model/friendsSlice';

type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function FriendCardComponent({ friend }: FriendProp): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector((store) => store.friend);
  const IsFriends = friends.find((el) => el.id === friend.id);
  const { data } = useAppSelector((store) => store.user);
  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink onClick={()=> dispatch(closeWindow())} to={`/friends/${String(friend.id)}`}>
          {friend.avatar ? (
            <img
              className={style.image}
              src={`http://localhost:3000/${friend.avatar}`}
              alt="foto"
            />
          ) : (
            <img
              className={style.image}
              src="/avatar.png"
              alt="foto"
            />
          )}
        </NavLink>
        <div className={style.info_wrapper}>
          <NavLink onClick={()=> dispatch(closeWindow())} to={`/friends/${String(friend.id)}`}>
            <h2>{friend.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(friend.birthday)}</p>
        </div>
        {IsFriends ? (data?.id !== friend.id &&
          <Icon
            onClick={() => {
              void dispatch(deleteFriendThunk(friend.id));
            }}
            name="trash alternate"
            color="red"
          />
        ) : (data?.id !== friend.id &&
          <Icon onClick={()=> void dispatch(addFriendThunk(friend.id))} name="add" color="green"/>
        )}
      </div>
    </>
  );
}
