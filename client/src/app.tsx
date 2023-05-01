import React, { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('./pages/Login'))

const App: FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
      </Routes>
    </Suspense>
  )
};

export default App;
