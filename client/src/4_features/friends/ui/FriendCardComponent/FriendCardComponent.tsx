import React from 'react';
import style from './FriendCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { closeWindow, unhideDeleteModal } from '../../model/friendsSlice';
import { useFriend } from '../../lib/useFriends';
import Spinner from '../../../../6_shared/ui/Spinner';

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
  const { friends, myRequestsLoading } = useAppSelector((store) => store.friend);
  const IsFriends = friends.find((el) => el.id === friend.id);
  const { data } = useAppSelector((store) => store.user);
  const { throttledAddFriend } = useFriend();

  return (
    <>
      <div className={style.card_wrapper}>
        <div className={style.profile_wrapper}>
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
        </div>

        {IsFriends
          ? data?.id !== friend.id && (
              <Popup
                content={`Удалить из друзей`}
                trigger={
                  <button
                    className={style.button_red}
                    onClick={() => {
                      dispatch(unhideDeleteModal(friend));
                    }}
                  >
                    Удалить
                  </button>
                }
              />
            )
          : data?.id !== friend.id && (
              <Popup
                content={`Отправить заявку в друзья`}
                trigger={
                  <button
                    className={style.button_green}
                    onClick={() => throttledAddFriend(friend.id)}
                  >
                    {myRequestsLoading ? <Spinner/> : 'Добавить'}
                  </button>
                }
              />
            )}
      </div>
    </>
  );
}
