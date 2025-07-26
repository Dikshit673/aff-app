import { Button } from '@/components/ui/Button';
import { setEditProductId } from '@/features/products/productsSlice';
import {
  deleteProduct,
  type ProductItem,
} from '@/features/products/productThunkApi';
import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const ProductCard = ({ product }: { product: ProductItem }) => {
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
      <li key={id} className='grid rounded-lg bg-white'>
        <div className='relative size-full'>
          {/* trhee dots options */}
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
          {/* thumbnail */}
          <div className='flex flex-col items-center px-4 pt-4'>
            <img
              src={thumbnail || ''}
              srcSet={images[0] || ''}
              alt={title}
              className='pointer-events-none size-30 object-cover'
            />
          </div>
        </div>
        <div className='row-span-3 grid grid-rows-subgrid p-4'>
          {/* title, category */}
          <div className='flex flex-wrap *:w-fit'>
            <h5 className='me-3 text-base font-semibold'>{title}</h5>
            <p className='h-min rounded-full border px-2 py-1 text-xs text-amber-500 transition-colors duration-150 ease-in hover:bg-amber-500 hover:text-white'>
              {category}
            </p>
          </div>
          {/* price */}
          <p className='text-sm font-semibold'>
            <span>
              ₹{Math.floor((Number(price) * (100 - discountPercentage)) / 100)}
              /-{' '}
            </span>
            <span className='text-gray-400 line-through'>₹{price}/-</span>
          </p>
          {/* rating */}
          <p className='text-sm text-gray-500'>{rating}/5</p>
        </div>
      </li>
    </>
  );
};
