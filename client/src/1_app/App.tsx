import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
