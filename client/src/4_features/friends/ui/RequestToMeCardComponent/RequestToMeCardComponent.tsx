import React from 'react';
import style from './RequestToMeCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { useFriend } from '../../lib/useFriends';

type FriendProp = {
  requestToMe: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function RequestToMeCardComponent({ requestToMe }: FriendProp): React.JSX.Element {
  const { acceptRequest, rejectRequest } = useFriend();

  return (
    <>
      <div className={style.card_wrapper}>
        <div className={style.profile_wrapper}>
          <NavLink to={`/friends/${String(requestToMe.id)}`}>
            {requestToMe.avatar ? (
              <img
                className={style.image}
                src={`http://localhost:3000/${requestToMe.avatar}`}
                alt="foto"
              />
            ) : (
              <img className={style.image} src="/avatar.png" alt="foto" />
            )}
          </NavLink>
          <div className={style.info_wrapper}>
            <NavLink to={`/friends/${String(requestToMe.id)}`}>
              <h2>{requestToMe.name}</h2>{' '}
            </NavLink>
            <p>День рождения: {String(requestToMe.birthday)}</p>
          </div>
        </div>
        <div className={style.button_wrapper}>
          <Popup
            content={`Отклонить заявку`}
            trigger={
              <button className={style.button_red} onClick={() => rejectRequest(requestToMe.id)}>
                Отклонить
              </button>
            }
          />
          <Popup
            content={`Принять заявку`}
            trigger={
              <button className={style.button_green} onClick={() => acceptRequest(requestToMe.id)}>
                Принять
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}
