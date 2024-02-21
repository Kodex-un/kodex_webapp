import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import InitialSetup from "./pages/InitialSetup";
import AppWrapper from "./pages/AppWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <InitialSetup />,
      },
    ],
  },
]);

export default router;
