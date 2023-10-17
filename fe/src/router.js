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
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/templatedetails/:id",
        element: <TemplateDetailsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
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
