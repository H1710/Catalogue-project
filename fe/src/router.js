import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/designer",
    element: <DesignerPage />,
  },
]);

export default router;
