import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import type { AxiosError } from 'axios';
import type { FormData } from '@/pages/Login';

type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: 'male' | 'female';
};

type InitialStateType = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: 'male' | 'female';
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: FormData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      // console.log(res.data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      // console.log(error);
      if (!error.response) {
        return rejectWithValue({ message: 'No response from server' });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: InitialStateType = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          // console.log(action.payload);
          const { accessToken, refreshToken, ...user } = action.payload;
          state.loading = false;
          state.user = user;
          state.token = accessToken;
          state.refreshToken = refreshToken;
          localStorage.setItem('token', refreshToken);
        }
      )
      .addCase(loginUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Login failed';
        state.token = null;
        state.refreshToken = null;
      });
  },
});

const { reducer: authReducer, actions } = authSlice;

export const { logout } = actions;
export default authReducer;
