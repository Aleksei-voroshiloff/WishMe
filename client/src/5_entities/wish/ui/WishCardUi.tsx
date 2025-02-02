import React from 'react';
import type { WishObjectType } from '../types/types';
import { CardMeta, CardHeader, CardContent, Card, Icon, Image } from 'semantic-ui-react';
import style from './OneWishListPage.module.scss';


type Props = {
  wish: WishObjectType;
};

export default function WishCardUi({ wish }: Props): React.JSX.Element {
  return (
    <Card>
      <Image src={wish.wishUrl} wrapped ui={false} />
      <CardContent>
        <CardHeader>{wish.title}</CardHeader>
        <CardMeta>
          <span className="date">{wish.wishListId}</span>
        </CardMeta>
      </CardContent>
      <CardContent extra>
        <Icon name="share" color="purple" />
      </CardContent>
    </Card>
  );
}
