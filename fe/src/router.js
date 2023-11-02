import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";

import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import CreateBlog from "./pages/CreateBlog";
import MainLayout from "./pages/MainLayout";
import TemplateDetailsPage from "./pages/TemplateDetailsPage";
import StatiticsPage from "./pages/StatiticsPage";
import BlogPageDetail from "./pages/BlogPageDetail";
import UserListPage from "./pages/UserListPage";
import DesignPage from "./pages/DesignPage";
import OrderListPage from "./pages/OrderListPage";

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
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:blogId",
        element: <BlogPageDetail />,
      },
      {
        path: "/blog/create",
        element: <CreateBlog />,
      },
      {
        path: "/design",
        element: <DesignPage />,
      },
      {
        path: "/templatedetails/:id",
        element: <TemplateDetailsPage />,
      },
      {
        path: "/statitics",
        element: <StatiticsPage />,
      },
      {
        path: "/account-list",
        element: <UserListPage />,
      },
      {
        path: "/order-list",
        element: <OrderListPage />,
      },
    ],
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default router;
