import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import SlotPage from '../pages/SlotPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/slot" replace />,
  },
  {
    path: '/slot',
    element: (
      <MainLayout>
        <SlotPage />
      </MainLayout>
    ),
  },
]);
