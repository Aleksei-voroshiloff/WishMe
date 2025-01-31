import React from 'react';
import type { WishListObjectType } from '../types/types';
import { CardMeta, CardHeader, CardContent, Card, Icon } from 'semantic-ui-react';

type Props = {
  list: WishListObjectType;
};

export default function WishListCardUi({ list }: Props): React.JSX.Element {
  return (
    <Card>
      {/* <Image src={list.img} wrapped ui={false} /> */}
      <CardContent>
        <CardHeader>{list.title}</CardHeader>
        <CardMeta>
          <span className="date">{list.date}</span>
        </CardMeta>
      </CardContent>
      <CardContent extra>
        <Icon name="share" color="purple" />
      </CardContent>
    </Card>
  );
}
