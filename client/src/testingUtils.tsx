import React, { Suspense } from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';

import Store from './redux/store';
import { Provider } from 'react-redux';
import Loading from './components/Loading';

interface IRenderPageParams {
  ui: JSX.Element;
  path?: string;
  route?: string;
  history?: MemoryHistory;
}

export const renderPage = ({
  ui,
  path = '/',
  route = '/',
  history = createMemoryHistory({initialEntries: [route]}),
}: IRenderPageParams) => {
  const content = (
    <Router basename={'/'} location={`/${route}`} navigator={history}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </Router>
  );

  return {
    ui: (
      <Provider store={Store}>
        <Suspense fallback={<Loading />}>
          {content}
        </Suspense>
      </Provider>
    ),
    history,
    store: Store,
  }
}