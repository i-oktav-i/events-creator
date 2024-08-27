import { createHashRouter, redirect } from 'react-router-dom';

import { GraphPage } from '@pages/Graph';
import { CreatePage, EditPage, MainPage } from '@pages/gameEvents';
import { Layout } from './ui/Layout';

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        children: [
          {
            path: '',
            element: <MainPage />,
          },
          {
            path: 'create/',
            element: <CreatePage />,
          },
          {
            path: 'edit/',
            loader: () => redirect('..'),
          },
          {
            path: 'edit/:id',
            element: <EditPage />,
          },
        ],
      },
      {
        path: '/game/',
      },
      {
        path: '/graph/',
        element: <GraphPage />,
      },
    ],
  },
]);
