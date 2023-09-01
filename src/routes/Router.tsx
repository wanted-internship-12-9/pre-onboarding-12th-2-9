import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import IssueListPage from '../pages/IssueListPage';
import IssueDetailPage from '../pages/IssueDetailPage';
import RouteErrorBoundary from '../components/RouteErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '',
        element: <IssueListPage />,
      },
      {
        path: 'issue/:id',
        element: <IssueDetailPage />,
      },
    ],
  },
]);

export default router;
