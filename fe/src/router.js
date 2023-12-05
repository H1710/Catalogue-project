import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/loading/LoadingPage";

const BlogPage = lazy(() => import("./pages/BlogPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const MainLayout = lazy(() => import("./components/layout/MainLayout"));
const TemplateDetailsPage = lazy(() => import("./pages/TemplateDetailsPage"));
const StatiticsPage = lazy(() => import("./pages/StatiticsPage"));
const BlogPageDetail = lazy(() => import("./pages/BlogPageDetail"));
const UserListPage = lazy(() => import("./pages/UserListPage"));
const DesignPage = lazy(() => import("./pages/DesignPage"));
const OrderListPage = lazy(() => import("./pages/OrderListPage"));
const ApproveBlogPage = lazy(() => import("./pages/ApproveBlogPage"));
const PreviewDesignPage = lazy(() => import("./pages/PreviewDesignPage"));
const MyBlog = lazy(() => import("./pages/MyBlogPage"));
const PublicTemplate = lazy(() => import("./pages/PublicTemplatePage"));
const ApproveTemplatePage = lazy(() => import("./pages/ApproveTemplatePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TemplatePage = lazy(() => import("./pages/TemplatePage"));

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
        element: (
          <Suspense fallback={<LoadingPage />}>
            <HomePage />
          </Suspense>
        ),
      },

      {
        path: "/blog",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "/blog/:blogId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <BlogPageDetail />
          </Suspense>
        ),
      },
      {
        path: "/blog/create",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CreateBlog />
          </Suspense>
        ),
      },
      {
        path: "/blog/approve",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ApproveBlogPage />
          </Suspense>
        ),
      },
      {
        path: "/design/:productId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <DesignPage />
          </Suspense>
        ),
      },
      {
        path: "/design/preview/:templateId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <PreviewDesignPage />
          </Suspense>
        ),
      },
      {
        path: "/templatedetails/:id",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TemplateDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/statitics",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <StatiticsPage />
          </Suspense>
        ),
      },
      {
        path: "/account-list",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UserListPage />
          </Suspense>
        ),
      },
      {
        path: "/order-list",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <OrderListPage />
          </Suspense>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/myblog",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MyBlog />
          </Suspense>
        ),
      },
      {
        path: "/public-form/:id",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <PublicTemplate />
          </Suspense>
        ),
      },
      {
        path: "/template/approve",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ApproveTemplatePage />
          </Suspense>
        ),
      },
      {
        path: "/template/:name",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TemplatePage />
          </Suspense>
        ),
      },
      {
        path: "/template",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TemplatePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
