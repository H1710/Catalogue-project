import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";

import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import CreateBlog from "./pages/CreateBlog";
import MainLayout from "./pages/MainLayout";
import TemplateDetailsPage from "./pages/TemplateDetailsPage";
import StatiticsPage from "./pages/StatiticsPage";
import ProductPage from "./pages/ProductPage";
import BlogPageDetail from "./pages/BlogPageDetail";
import UserListPage from "./pages/UserListPage";

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
        path: "/create-blog",
        element: <CreateBlog />,
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
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  
]);

export default router;
