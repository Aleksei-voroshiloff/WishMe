import React from 'react';
import { SkewLoader } from 'react-spinners';
import style from './Loader.module.scss';

export default function Loader(): React.JSX.Element {
  return (
    <div className={style.loader}>
      <SkewLoader color="#564095" size={40} speedMultiplier={1} />
    </div>
  );
}
