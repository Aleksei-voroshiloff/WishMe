import React from 'react';
import style from './FriendCardComponent.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { deleteFriendThunk } from '../../lib/friendsThunk';

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
const {friends} = useAppSelector((state) => state.friend)
  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink to={`/friends/${String(friend.id)}`}>
          {friend.avatar ? (
            <img className={style.image} src={friend.avatar} alt="foto" />
          ) : (
            <img
              className={style.image}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQycpUJ3ZthUXax2SBqN96C4xh1C4tyA7XbPA&s"
              alt="foto"
            />
          )}
        </NavLink>
        <div className={style.info_wrapper}>
          <NavLink to={`/friends/${String(friend.id)}`}>
            <h2>{friend.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(friend.birthday)}</p>
        </div>
        <Icon onClick={() => {void dispatch(deleteFriendThunk(friend.id))
          console.log(friends)
        }} name='trash alternate' color='red'/>
      </div>
    </>
  );
}
