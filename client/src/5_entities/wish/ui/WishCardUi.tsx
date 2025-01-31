import React from 'react';
import type { WishObjectType } from '../types/types';
import { CardMeta, CardHeader, CardContent, Card, Icon } from 'semantic-ui-react';

type Props = {
  list: WishObjectType;
};

export default function WishCardUi({ wish }: Props): React.JSX.Element {
  return (
    <Card>
      {/* <Image src={list.img} wrapped ui={false} /> */}
      <CardContent>
        <CardHeader>{wish.title}</CardHeader>
        <CardMeta>
          <span className="date">{wish.date}</span>
        </CardMeta>
      </CardContent>
      <CardContent extra>
        <Icon name="share" color="purple" />
      </CardContent>
    </Card>
  );
}
