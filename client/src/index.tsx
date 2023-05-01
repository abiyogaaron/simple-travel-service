import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from './redux/store';

import App from './app';

import './index.css';

(async () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  
  root.render(
    <BrowserRouter basename={'/'}>
      <Provider store={Store}>
        <App /> 
      </Provider>
    </BrowserRouter>,
  );
})();
