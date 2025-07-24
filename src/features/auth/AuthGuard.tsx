import { useAppSelector } from '@/redux/store';
import { Navigate, Outlet } from 'react-router';

function AuthGuard() {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to='/login' replace />;
}

function PublicGuard() {
  const token = useAppSelector((state) => state.auth.token);
  return !token ? <Outlet /> : <Navigate to='/dashboard' replace />;
}

export { AuthGuard, PublicGuard };
