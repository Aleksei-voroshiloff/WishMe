import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { deleteFriendThunk } from '../../lib/friendsThunk';
import style from './MyRequestCardComponent.module.scss';

type FriendProp = {
  myRequest: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function MyRequestCardComponent({ myRequest }: FriendProp): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((store) => store.user);

  return (
    <>
      <div className={style.card_wrapper}>
        <NavLink to={`/friends/${String(myRequest.id)}`}>
          {myRequest.avatar ? (
            <img
              className={style.image}
              src={`http://localhost:3000/${myRequest.avatar}`}
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
          <NavLink to={`/friends/${String(myRequest.id)}`}>
            <h2>{myRequest.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(myRequest.birthday)}</p>
        </div>
          <Icon
            onClick={() => {
              void dispatch(deleteFriendThunk(myRequest.id));
            }}
            name="trash alternate"
            color="red"
          />

      </div>
    </>
  );
}
