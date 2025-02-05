import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { getAllRequestsToMeThunk } from '../../lib/friendsThunk';
import style from './RequestToMeWrapper.module.scss';
import RequestToMeCardComponent from '../RequestToMeCardComponent/RequestToMeCardComponent';

export default function RequestToMeWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { requestsToMe} = useAppSelector((state) => state.friend);

  // useEffect(() => {
  //   void dispatch(getAllRequestsToMeThunk());
  // }, [dispatch]);

  console.log(requestsToMe, 'requestToMe');

  return (
    <>
    <h3>Предложили дружбу</h3>
    <div className={style.list}>
      {requestsToMe.map((requestToMe) => (
        <RequestToMeCardComponent key={requestToMe.id} requestToMe={requestToMe} />
      ))}
    </div></>
    
  );
}
