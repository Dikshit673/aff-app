import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useCallback } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <section className='bg-gray-600/20 py-4'>
      <div className='mx-auto flex w-9/10 items-center justify-between rounded-lg bg-white px-4 py-1'>
        <div>
          <h1 className='text-2xl font-bold'>AffApp</h1>
        </div>
        <nav>
          <ul className='flex items-center gap-4'>
            {!token && (
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
            )}
            {token && (
              <>
                <li>
                  <NavLink to='/'>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to='/products'>Products</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='rounded-lg bg-blue-600 px-4 py-1.5 text-white active:scale-95'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
