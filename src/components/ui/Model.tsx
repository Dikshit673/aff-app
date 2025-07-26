import {
  setEditProductId,
  toggleAddProductForm,
} from '@/features/products/productsSlice';
import { useAppDispatch } from '@/redux/store';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Model = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  return createPortal(
    <div className='fixed top-0 right-0 left-0 z-50 h-screen w-full bg-gray-600/20 backdrop-blur-md'>
      <div
        className='flex h-full w-full items-center justify-center overflow-y-auto'
        onClick={() => {
          dispatch(toggleAddProductForm(false));
          dispatch(setEditProductId(null));
        }}
      >
        <div
          className='my-auto w-9/10 rounded-lg bg-white px-8 py-8 md:w-6/10 xl:w-4/10'
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};

export default Model;
