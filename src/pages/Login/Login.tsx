import { loginUser } from '@/features/auth/authSlice';
import { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [formData, setFormData] = useState<FormData>({
    username: 'emilys',
    password: 'emilyspass',
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/dashboard'); // only navigate on success
      }
    },
    [dispatch, formData, navigate]
  );

  const { username, password } = formData;
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-600/20'>
      <div className='max-w-90 rounded-lg bg-white p-8'>
        <h1 className='mb-4 text-center text-3xl font-semibold'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <p className='rounded-md bg-red-100/50 px-2 py-1 text-red-600'>
              {error}
            </p>
          )}
          <Input
            id='login-form-username'
            label='username'
            name='username'
            value={username}
            onChange={handleInputChange}
          />
          <Input
            id='login-form-password'
            label='Password'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
          <Button type='submit' label='Login' />
          {loading && <p>loading</p>}
        </form>
      </div>
    </div>
  );
}
