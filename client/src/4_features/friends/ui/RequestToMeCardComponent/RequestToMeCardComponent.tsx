import React from 'react';
import style from './RequestToMeCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
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
const {acceptRequest, rejectRequest} = useFriend()
  
  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink to={`/friends/${String(requestToMe.id)}`}>
          {requestToMe.avatar ? (
            <img
              className={style.image}
              src={`http://localhost:3000/${requestToMe.avatar}`}
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
          <NavLink to={`/friends/${String(requestToMe.id)}`}>
            <h2>{requestToMe.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(requestToMe.birthday)}</p>
        </div>
          <Icon title='Отклонить заявку'
            onClick={() => {
              rejectRequest(requestToMe.id)
            }}
            name="trash alternate"
            color="red"
          />
          <Icon title='Принять заявку' onClick={() => 
              acceptRequest(requestToMe.id)
            } name="add" color="green"/>
      </div>
    </>
  );
}
