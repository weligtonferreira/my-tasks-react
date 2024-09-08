import { Navigate, Outlet } from 'react-router-dom';

import { LoadingPage } from '../../pages/loading';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (user?.name) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
}
