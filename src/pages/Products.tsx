import { useEffect, useState } from 'react';
import {
  toggleAddProductForm,
  setEditProductId,
} from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AddProductForm from '@/features/products/AddProductForm';
import { Button } from '@/components/ui/Button';
import {
  deleteProduct,
  fetchProducts,
  type ProductItem,
} from '@/features/products/productThunkApi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import EditProductForm from '@/features/products/EditProductForm';

const ProductCard = ({ product }: { product: ProductItem }) => {
  const dispatch = useAppDispatch();
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const handleEditClick = () => {
    dispatch(setEditProductId(product.id));
    setOpenOptions(false);
  };
  const handleDeleteClick = () => {
    dispatch(deleteProduct(product.id));
    setOpenOptions(false);
  };

  const {
    id,
    title,
    thumbnail,
    images,
    category,
    price,
    rating,
    discountPercentage,
  } = product;

  return (
    <>
      <li
        key={id}
        className='relative grid grid-cols-subgrid grid-rows-1 rounded-lg bg-white'
      >
        <div className='absolute top-0 right-0'>
          <Button
            label={<BsThreeDotsVertical className='size-5' />}
            onClick={() => setOpenOptions(!openOptions)}
            className='cursor-pointer bg-transparent p-2.5 text-black'
          />
          {openOptions && (
            <div className='relative'>
              <div className='shadow-primary absolute top-0 right-0 w-20 rounded-lg bg-gray-400/15 capitalize backdrop-blur-lg *:cursor-pointer *:rounded-lg *:px-4 *:py-0.5'>
                <div className='text-blue-600' onClick={handleEditClick}>
                  edit
                </div>
                <div className='text-red-600' onClick={handleDeleteClick}>
                  delete
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center px-4 pt-4'>
          <img
            src={thumbnail ?? ''}
            srcSet={images[0] ?? ''}
            alt={title}
            className='size-30 object-cover'
          />
        </div>
        <div className='p-4'>
          <div>
            <h5 className='me-3.5 inline-block text-base font-semibold'>
              {title}
            </h5>
            <p className='inline-block rounded-full border px-1.5 text-[10px] text-amber-500 transition-colors duration-150 ease-in hover:bg-amber-500 hover:text-white'>
              {category}
            </p>
          </div>
          <p className='text-sm font-semibold'>
            <span>
              ₹{Math.floor((Number(price) * (100 - discountPercentage)) / 100)}
              /-{' '}
            </span>
            <span className='text-gray-400 line-through'>₹{price}/-</span>
          </p>
          <p className='text-sm text-gray-500'>{rating}/5</p>
        </div>
      </li>
    </>
  );
};

export default function Products() {
  const dispatch = useAppDispatch();
  const { list, loading, isAddProductFormOpen, editProductId } = useAppSelector(
    (s) => s.products
  );

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
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className='my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {list.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </section>
      {isAddProductFormOpen && (
        <div className='fixed top-0 right-0 left-0 z-50 h-screen w-full bg-gray-600/20 backdrop-blur-md'>
          <div className='flex h-full items-center justify-center overflow-y-auto'>
            <div className='my-auto w-9/10 rounded-lg bg-white px-8 py-8 md:w-6/10 xl:w-4/10'>
              <AddProductForm />
            </div>
          </div>
        </div>
      )}
      {editProductId && (
        <div className='fixed top-0 right-0 left-0 z-50 h-screen w-full bg-gray-600/20 backdrop-blur-md'>
          <div className='flex h-full items-center justify-center overflow-y-auto'>
            <div className='my-auto w-9/10 rounded-lg bg-white px-8 py-8 md:w-6/10 xl:w-4/10'>
              <EditProductForm productId={editProductId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
