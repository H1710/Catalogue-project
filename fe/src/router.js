import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";
import CreateBlog from "./pages/CreateBlog";
import MainLayout from "./pages/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/designer",
        element: <DesignerPage />,
      },
      {
        path: "/blog/create",
        element: <CreateBlog />,
      },
    ],
  },
]);

export default router;
