import React from 'react';
import style from './PresentFriend.module.scss';
import { CardContent, Image, Button } from 'semantic-ui-react';
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
  const formatPrice = (wishPrice: string): string =>
    wishPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className={style.content}>
      <div className={style.friend}>
        <Image src={wish.file} className={style.image} />
        <div className={style.desc}>
          <div className={style.title}>{wish.title}</div>
          <div className={style.price}>{`${formatPrice(wish.price.toString())} руб`}</div>
          <Button
            primary
            as={Link}
            to={wish.wishUrl}
            icon="cart arrow down"
            label={{ as: 'a', basic: true, pointing: 'right', content: 'Перейти к товару' }}
            labelPosition="left"
          />
        </div>
        <CardContent extra>
          <div className={style.userinfo}>
            <Image
              className={style.ava}
              src={user.avatar === null ? '/avatar.png' : `http://localhost:3000/${user.avatar}`}
            />
            <div>{user.name}</div>
            <div>{wishlist.title}</div>
            <div>{wishlist.date}</div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
