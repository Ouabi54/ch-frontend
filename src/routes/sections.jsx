import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import useAuth from 'src/hooks/use-auth';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoute from './ProtectedRoute';

export const RequestsPage = lazy(() => import('src/pages/requests'));
export const UsersPage = lazy(() => import('src/pages/users'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute isAuthenticated={useAuth()}>
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <UsersPage />, index: true },
        { path: 'friends', element: <UsersPage /> },
        { path: 'requests', element: <RequestsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
