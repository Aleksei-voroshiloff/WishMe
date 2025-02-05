import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchUser, myCabinetInfo } from '../5_entities/user/lib/userThunks';
import { getAllPresent } from '../5_entities/present/lib/presentThunk';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.data);

  useEffect(() => {
    void dispatch(fetchUser());
    void dispatch(getAllPresent())
    if (data?.id !== undefined) void dispatch(myCabinetInfo(data.id));
  }, [dispatch, data?.id]);

  return <RouterProvider router={router} />;
}

export default App;
