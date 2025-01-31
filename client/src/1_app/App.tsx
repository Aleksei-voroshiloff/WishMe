import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getWishList } from '../5_entities/wishlist/lib/wishListThunk';
import { fetchUser } from '../5_entities/user/lib/userThunks';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getWishList());
    void dispatch(fetchUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
