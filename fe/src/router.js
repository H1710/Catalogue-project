import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";

import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import CreateBlog from "./pages/CreateBlog";
import MainLayout from "./components/layout/MainLayout";
import TemplateDetailsPage from "./pages/TemplateDetailsPage";
import StatiticsPage from "./pages/StatiticsPage";
import BlogPageDetail from "./pages/BlogPageDetail";
import UserListPage from "./pages/UserListPage";
import DesignPage from "./pages/DesignPage";
import OrderListPage from "./pages/OrderListPage";
import ApproveBlogPage from "./pages/ApproveBlogPage";
import PreviewDesignPage from "./pages/PreviewDesignPage";
import MyBlog from "./pages/MyBlogPage";
import PublicTemplate from "./pages/PublicTemplatePage";

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
        path: "/blog/approve",
        element: <ApproveBlogPage />,
      },
      {
        path: "/design/:productId",
        element: <DesignPage />,
      },
      {
        path: "/design/preview/:templateId",
        element: <PreviewDesignPage />,
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
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/myblog",
        element: <MyBlog />,
      },
      {
        path: "/public-form/:id",
        element: <PublicTemplate />,
      },
      {
        path: "/template/approve",
        element: <PublicTemplate />,
      },
    ],
  },

 
]);

export default router;
