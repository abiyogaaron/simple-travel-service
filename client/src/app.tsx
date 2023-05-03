import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';

const Login = lazy(() => import('./pages/Login'));

const App: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
