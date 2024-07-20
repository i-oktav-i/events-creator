import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout';
import { EventCreator } from './pages/EventCreator';
import { Game } from './pages/Game';

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
          element: <Game />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
