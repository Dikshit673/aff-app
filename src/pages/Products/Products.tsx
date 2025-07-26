import { useEffect } from 'react';
import { toggleAddProductForm } from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AddProductForm from '@/features/products/AddProductForm';
import { Button } from '@/components/ui/Button';
import { fetchProducts } from '@/features/products/productThunkApi';

import Model from '@/components/ui/Model';
import { ProductBody } from './ProductsBody';

export default function Products() {
  const dispatch = useAppDispatch();
  const { isAddProductFormOpen } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section className='min-h-screen bg-gray-600/20 py-4'>
        <div className='mx-auto w-9/10'>
          <div className='flex items-center justify-between'>
            <h1 className='mb-4 text-2xl font-bold'>Products</h1>
            <Button
              label='Add Product'
              onClick={() => dispatch(toggleAddProductForm(true))}
            />
            {isAddProductFormOpen && (
              <Model>
                <AddProductForm />
              </Model>
            )}
          </div>

          <ProductBody />
        </div>
      </section>
    </>
  );
}
