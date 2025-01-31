import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './1_app/style/GlobalFonts.module.scss';
import App from './1_app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './1_app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
