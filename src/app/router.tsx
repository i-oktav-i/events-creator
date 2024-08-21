import { createBrowserRouter } from 'react-router-dom';

import { EventCreator } from '@pages/EventCreator';
import { GraphPage } from '@pages/Graph';
import { Layout } from './ui/Layout';

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <EventCreator />,
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
