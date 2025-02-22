import React from 'react';
import { useAppSelector } from '../../../../1_app/store/hooks';
import style from './MyRequestWrapper.module.scss';
import MyRequestCardComponent from '../MyRequestCardComponent/MyRequestCardComponent';

export default function MyRequestWrapper(): React.JSX.Element {
  const { myRequests } = useAppSelector((state) => state.friend);

  return (
    <>
      {myRequests.length > 0 && (
        <>
          <h2>Отправленные заявки:</h2>
          <div className={style.list}>
            {myRequests.map((myRequest) => (
              <MyRequestCardComponent key={myRequest.id} myRequest={myRequest} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
