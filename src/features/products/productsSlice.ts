import {
  // createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
// import axiosClient from '../../api/axiosClient';
// import type { AxiosError } from 'axios';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  type ProductItem,
} from './productThunkApi';

// export type ProductItem = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   tags: string[];
//   brand: string;
//   sku: string;
//   weight: number;
//   dimensions: {
//     width: number;
//     height: number;
//     depth: number;
//   };
//   warrantyInformation: string;
//   shippingInformation: string;
//   availabilityStatus: string;
//   reviews: {
//     rating: number;
//     comment: string;
//     date: Date;
//     reviewerName: string;
//     reviewerEmail: string;
//   }[];
//   returnPolicy: string;
//   minimumOrderQuantity: number;
//   meta: {
//     createdAt: Date;
//     updatedAt: Date;
//     barcode: number;
//     qrCode: string;
//   };
//   images: string[];
//   thumbnail: string;
// };

// type ProductResponse = {
//   products: ProductItem[];
//   total: number;
//   skip: number;
//   limit: number;
// };

interface InitialStateType {
  list: ProductItem[];
  loading: boolean;
  isAddProductFormOpen: boolean;
  editProductId: number | null;
}

// export const fetchProducts = createAsyncThunk(
//   'products/fetch',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosClient.get<ProductResponse>('/products');
//       return res.data.products;
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       if (!err.response) {
//         return rejectWithValue({ message: 'No response from server' });
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const addProduct = createAsyncThunk(
//   'products/add',
//   async (product: { title: string }, { rejectWithValue }) => {
//     try {
//       // console.log('add product:', product);
//       const res = await axiosClient.post<ProductItem>('/products/add', product);
//       console.log(res);
//       return res.data;
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       console.log('product error');
//       if (!err.response) {
//         return rejectWithValue({ message: 'No response from server' });
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const initialState: InitialStateType = {
  list: [],
  loading: false,
  isAddProductFormOpen: false,
  editProductId: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleAddProductForm: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddProductFormOpen = payload;
    },
    setEditProductId: (state, { payload }: PayloadAction<number | null>) => {
      state.editProductId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.list.push(payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        console.log('ok slice prod');
        state.list = state.list.map((product) =>
          product.id === payload.id ? payload : product
        );
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        const tempList = state.list.filter(
          (product) => product.id !== payload.id
        );
        console.log(tempList);
        state.list = tempList;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: productsReducer, actions } = productsSlice;

export const { toggleAddProductForm, setEditProductId } = actions;

export default productsReducer;
