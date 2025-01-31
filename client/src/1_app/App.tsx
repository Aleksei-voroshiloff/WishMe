import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { useAppDispatch } from './store/hooks';
import { getWishList } from '../5_entities/wishlist/lib/wishListThunk';
import { getWish } from '../5_entities/wish/lib/wishThunk';
import { fetchUser } from '../5_entities/user/lib/userThunks';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();


  useEffect(() => {
    void dispatch(getWishList());
    void dispatch(getWish());
       void dispatch(fetchUser())
  }, [dispatch]);



  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
