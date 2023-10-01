import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignerPage from "./pages/DesignerPage";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/designer",
    element: <DesignerPage />,
  },
  {
    path: "/blogpage",
    element: <BlogPage/>
  },{
    path: "/profile",
    element: <ProfilePage/>
  }

]);

export default router;
