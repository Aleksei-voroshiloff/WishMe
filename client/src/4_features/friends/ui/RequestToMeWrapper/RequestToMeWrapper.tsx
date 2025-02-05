import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../1_app/store/hooks';
import { getAllRequestsToMeThunk } from '../../lib/friendsThunk';
import style from './RequestToMeWrapper.module.scss'

export default function RequestToMeWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { requestsToMe } = useAppSelector((state) => state.friend);

  useEffect(() => {
    void dispatch(getAllRequestsToMeThunk());
  }, [dispatch]);

  return (
    <div className={style.list}>
     RequestToMeWrapper
    </div>
  );
}
