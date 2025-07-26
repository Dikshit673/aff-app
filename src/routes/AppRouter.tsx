import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthGuard, PublicGuard } from '../features/auth/AuthGuard';
import Navbar from '@/components/Navbar';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {/* public routes */}
          <Route element={<PublicGuard />}>
            <Route path='/login' element={<Login />} />
          </Route>
          {/* private routes */}
          <Route element={<AuthGuard />}>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
          </Route>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
