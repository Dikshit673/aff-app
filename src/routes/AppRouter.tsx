import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import { AuthGuard, PublicGuard } from '../features/auth/AuthGuard';
import Navbar from '@/components/Navbar';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
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
    </BrowserRouter>
  );
}
