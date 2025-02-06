import { NavLink } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';
import style from './MyRequestCardComponent.module.scss';
import { useFriend } from '../../lib/useFriends';

type FriendProp = {
  myRequest: {
    id: number;
    name: string;
    birthday: string | null;
    avatar: string | null;
  };
};

export default function MyRequestCardComponent({ myRequest }: FriendProp): React.JSX.Element {
  const { cancelRequest } = useFriend();

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
            <img className={style.image} src="/avatar.png" alt="foto" />
          )}
        </NavLink>
        <div className={style.info_wrapper}>
          <NavLink to={`/friends/${String(myRequest.id)}`}>
            <h2>{myRequest.name}</h2>{' '}
          </NavLink>
          <p>День рождения: {String(myRequest.birthday)}</p>
        </div>
        <Popup
          content={`Отменить заявку`}
          trigger={
            <Icon
              title="Отменить заявку"
              onClick={() => cancelRequest(myRequest.id, myRequest.name)}
              name="trash alternate"
              color="red"
            />
          }
        />
      </div>
    </>
  );
}
