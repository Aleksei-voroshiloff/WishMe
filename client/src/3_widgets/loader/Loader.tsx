import React from 'react';
import { GridLoader } from 'react-spinners';
import style from './Loader.module.scss';

export default function Loader(): React.JSX.Element {
  return (
    <div className={style.loader}>
      <GridLoader color="#9d3939" size={20} />
    </div>
  );
}
