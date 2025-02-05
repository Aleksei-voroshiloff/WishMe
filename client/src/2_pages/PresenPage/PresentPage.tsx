import React from 'react';
import style from './PresentPage.module.scss';
// import { useAppSelector } from '../../1_app/store/hooks';

export default function PresentPage(): React.JSX.Element {
  // const present = useAppSelector((state) => state)
  return (
    <div className={style.str}>
      <div className={style.first_div}></div>
      {/* {presents.map((present) => (

      ))} */}
      <div className={style.content}>
        <div className={style.friend}>sdfs</div>
      </div>
    </div>
  );
}
