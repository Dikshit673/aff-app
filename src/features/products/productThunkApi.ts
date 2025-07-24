import axiosClient from '@/api/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

export type ProductItem = {
  id: number;
  title: string;
  price: string;
  discountPercentage: number;
  stock: number;
  rating: number;
  images: string[];
  thumbnail: string;
  description: string;
  brand: string;
  category: string;
};

type PutPayload = {
  id: number;
  product: Pick<
    ProductItem,
    | 'title'
    | 'price'
    | 'thumbnail'
    | 'images'
    | 'category'
    | 'rating'
    | 'discountPercentage'
  >;
};

type ProductResponse = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get<ProductResponse>('/products');
      return res.data.products;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (!err.response) {
        return rejectWithValue({ message: 'No response from server' });
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: { title: string }, { rejectWithValue }) => {
    try {
      // console.log('add product:', product);
      const res = await axiosClient.post<ProductItem>('/products/add', product);
      console.log(res);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log('product error');
      if (!err.response) {
        return rejectWithValue({ message: 'No response from server' });
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, product }: PutPayload, { rejectWithValue }) => {
    try {
      console.log('in update', product);
      const res = await axiosClient.put<ProductItem>(
        `/products/${id}`,
        product
      );
      console.log(res);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log('in eror update', error);
      if (!err.response) {
        return rejectWithValue({ message: 'No response from server' });
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await axiosClient.delete<ProductItem>(`/products/${id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (!err.response) {
        return rejectWithValue({ message: 'No response from server' });
      }
      return rejectWithValue(err.response.data);
    }
  }
);
