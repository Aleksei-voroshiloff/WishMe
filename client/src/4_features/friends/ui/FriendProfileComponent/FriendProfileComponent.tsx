import React from 'react';
import style from './FriendProfileComponent.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { useFriend } from '../../lib/useFriends';
import { Popup } from 'semantic-ui-react';
import { unhideDeleteModal } from '../../model/friendsSlice';
import Spinner from '../../../../6_shared/ui/Spinner';


type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  } | null;
};

export default function FriendProfileComponent({ friend }: FriendProp): React.JSX.Element {
const dispatch = useAppDispatch();
  const { friends, myRequestsLoading } = useAppSelector((store) => store.friend);
  const IsFriends = friends.find((el) => el.id === friend?.id);
  const { data } = useAppSelector((store) => store.user);
  const { throttledAddFriend } = useFriend();

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
        <div>
        {IsFriends && friend
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
          : friend && data?.id !== friend.id && (
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
      </div>
    </>
  );
}
