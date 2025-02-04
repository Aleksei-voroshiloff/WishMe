import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { fetchUser, myCabinetInfo } from '../5_entities/user/lib/userThunks';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUser());
    void dispatch(myCabinetInfo());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
