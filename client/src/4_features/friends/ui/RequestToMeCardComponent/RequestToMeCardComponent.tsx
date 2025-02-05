import React from 'react';
import style from './RequestToMeCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { deleteFriendThunk } from '../../lib/friendsThunk';
import { closeWindow } from '../../model/friendsSlice';

type FriendProp = {
  friend: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function RequestToMeCardComponent({ requestToMe }: FriendProp): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { friends } = useAppSelector((store) => store.friend);
  const { data } = useAppSelector((store) => store.user);
  
  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink onClick={()=> dispatch(closeWindow())} to={`/friends/${String(requestToMe.id)}`}>
          {requestToMe.avatar ? (
            <img
              className={style.image}
              src={`http://localhost:3000/${requestToMe.avatar}`}
              alt="foto"
            />
          ) : (
            <img
              className={style.image}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycpUJ3ZthUXax2SBqN96C4xh1C4tyA7XbPA&s"
              alt="foto"
            />
          )}
        </NavLink>
        <div className={style.info_wrapper}>
          <NavLink onClick={()=> dispatch(closeWindow())} to={`/friends/${String(requestToMe.id)}`}>
            <h2>{requestToMe.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(requestToMe.birthday)}</p>
        </div>
        {IsFriends ? (data?.id !== requestToMe.id &&
          <Icon
            onClick={() => {
              void dispatch(deleteFriendThunk(requestToMe.id));
            }}
            name="trash alternate"
            color="red"
          />
        ) : (data?.id !== requestToMe.id &&
          <Icon name="add" color="green"/>
        )}
      </div>

      RequestToMeCardComponent
    </>
  );
}
