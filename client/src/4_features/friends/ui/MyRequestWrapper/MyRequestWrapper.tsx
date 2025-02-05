import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { getAllMyRequestsThunk } from '../../lib/friendsThunk';
import style from './MyRequestWrapper.module.scss'
import MyRequestCardComponent from '../MyRequestCardComponent/MyRequestCardComponent';

export default function MyRequestWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  
  // useEffect(() => {
  //   void dispatch(getAllMyRequestsThunk());
  // }, [dispatch]);

  const { myRequests, myRequestsError } = useAppSelector((state) => state.friend);

  console.log(myRequests, 'myRequests', myRequestsError)
  
  return (
     <> 
     <h3>Отправленные заявки</h3>
    <div className={style.list}>
      {myRequests.map((myRequest) => (
        <MyRequestCardComponent key={myRequest.id} myRequest={myRequest} />
      ))}
    </div>
    </>
  );
}
