import React from 'react';
import style from './PresentFriend.module.scss';
import { CardMeta, CardContent, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import type { OneUserType } from '../../user/types/types';
import type { WishObjectType } from '../../wish/types/types';
import type { WishListObjectType } from '../../wishlist/types/types';

type PresentProps = {
  wish: WishObjectType;
  user: OneUserType;
  wishlist: WishListObjectType;
};

export default function PresentFriendUi({ wish, user, wishlist }: PresentProps): React.JSX.Element {
  return (
    <div className={style.content}>
      <div className={style.friend}>
        <Image src={wish.file} className={style.image} />
        <CardContent>
          <h2>{wish.title}</h2>
          <CardMeta>{wish.price}</CardMeta>
       
          <Button
            primary
            as={Link}
            to={wish.wishUrl}
            icon="cart arrow down"
            label={{ as: 'a', basic: true, pointing: 'right', content: 'Перейти к товару' }}
            labelPosition="left"
          />
        </CardContent>
        <CardContent extra>
          <a>
            <Image
              className={style.ava}
              src={user.avatar === null ? '/avatar.png' : `http://localhost:3000/${user.avatar}`}
            />
            {user.name}
            <br/>
            {wishlist.title}
            <br/>
            {wishlist.date}
          </a>
        </CardContent>
      </div>
    </div>
  );
}
