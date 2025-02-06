import React from 'react';
import style from './FriendCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { closeWindow } from '../../model/friendsSlice';
import { useFriend } from '../../lib/useFriends';

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

  const {throttledAddFriend, deleteFriend} = useFriend()

  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink onClick={() => dispatch(closeWindow())} to={`/friends/${String(friend.id)}`}>
          {friend.avatar ? (
            <img
              className={style.image}
              src={`http://localhost:3000/${friend.avatar}`}
              alt="foto"
            />
          ) : (
            <img className={style.image} src="/avatar.png" alt="foto" />
          )}
        </NavLink>
        <div className={style.info_wrapper}>
          <NavLink onClick={() => dispatch(closeWindow())} to={`/friends/${String(friend.id)}`}>
            <h2>{friend.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {friend.birthday}</p>
        </div>
        {IsFriends
          ? data?.id !== friend.id && (
            <Popup content={`Удалить из друзей`} trigger={<Icon
              onClick={() => {
                deleteFriend(friend.id, friend.name)
              }}
              name="trash alternate"
              color="red"
            />}/>
              
            )
          : data?.id !== friend.id && (
              <Popup content={`Отправить заявку в друзья`} trigger={<Icon
                onClick={() => throttledAddFriend(friend.id)}
                name="add"
                color="green"
              />}/>
            )}
      </div>
      
    </>
  );
}
