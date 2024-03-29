import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import AppWrapper from "./pages/AppWrapper";
import LogPage from "@pages/LogPage";
import GuidelinePage from "@pages/GuidelinePage";
import AnalyticsPage from "@pages/AnalyticsPage";
import AccountPage from "@pages/AccountPage";
import APIDocPage from "@pages/APIDocPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LogPage />,
      },
      {
        path: "/logs",
        element: <LogPage />,
      },
      {
        path: "/guideline",
        element: <GuidelinePage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/api",
        element: <APIDocPage />,
      },
    ],
  },
]);

export default router;
