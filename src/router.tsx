import { createBrowserRouter } from "react-router-dom";

import { EventCreator } from "./pages/EventCreator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EventCreator />,
  },
]);
