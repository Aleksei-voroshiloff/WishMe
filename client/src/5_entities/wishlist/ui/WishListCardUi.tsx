import React from 'react';
import type { WishListObjectType } from '../types/types';
import { Icon } from 'semantic-ui-react';
import style from '../../../2_pages/WishListPage/WishListPage.module.scss';

type Props = {
  list: WishListObjectType;
};

export default function WishListCardUi({ list }: Props): React.JSX.Element {
  return (
    <div >
      {/* <Image src={list.img} wrapped ui={false} /> */}
      <div className={style.topRight}>
      <Icon name="pencil alternate" color="black" />
      </div>
        <h3>
            {list.title}    
            <Icon name="share" color="purple" />
            </h3>
        
          <span >Дата мероприятия:<br/>{list.date}</span>
        
      
      
        
      
    </div>
  );
}
