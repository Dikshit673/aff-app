import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState, type FormEvent } from 'react';
import { updateProduct, type ProductItem } from './productThunkApi';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setEditProductId } from './productsSlice';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router';

type FormData = Pick<
  ProductItem,
  | 'title'
  | 'price'
  | 'thumbnail'
  | 'images'
  | 'category'
  | 'rating'
  | 'discountPercentage'
>;

interface EditProductFormType {
  productId: number;
}

const EditProductForm = ({ productId }: EditProductFormType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productList = useAppSelector((s) => s.products.list);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    thumbnail: '',
    images: [''],
    category: '',
    rating: 0,
    discountPercentage: 0,
  });
  const [error, setError] = useState<string | null>(null);
  //   console.log(formData);

  useEffect(() => {
    const foundItem = productList.find((p) => p.id === productId);
    if (!foundItem) {
      navigate('/products');
      dispatch(setEditProductId(null));
      return;
    }
    const {
      title,
      price,
      thumbnail,
      images,
      rating,
      category,
      discountPercentage,
    } = foundItem;
    setFormData({
      title,
      price,
      thumbnail,
      images,
      category,
      rating,
      discountPercentage,
    });
  }, [productList, productId, navigate, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, [name]: [...formData.images[0], value] });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      title,
      price,
      thumbnail,
      images,
      rating,
      category,
      discountPercentage,
    } = formData;
    if (
      !title ||
      !price ||
      !thumbnail ||
      !images[0] ||
      !rating ||
      !category ||
      !discountPercentage
    ) {
      setError('Please fill all the fields');
      return;
    }
    const newProduct = {
      id: productId,
      product: formData,
    };
    // console.log(newProduct);
    console.log(formData);
    const result = await dispatch(updateProduct(newProduct));
    if (updateProduct.fulfilled.match(result)) {
      setFormData({
        title: '',
        price: '',
        thumbnail: '',
        images: [''],
        category: '',
        rating: 0,
        discountPercentage: 0,
      });
      setError(null);
      dispatch(setEditProductId(null));
      navigate('/products'); // optional redirect after update
    } else {
      setError('Failed to update product');
    }
  };

  const {
    title,
    price,
    thumbnail,
    images,
    category,
    rating,
    discountPercentage,
  } = formData;

  return (
    <form className='relative space-y-4 space-x-2' onSubmit={handleEdit}>
      <div className='absolute top-0 right-0'>
        <Button
          label={<MdClose className='size-6' />}
          className='cursor-pointer bg-transparent p-2.5 text-black shadow-md'
          onClick={() => dispatch(setEditProductId(null))}
        />
      </div>
      <h1 className='mb-4 text-center text-3xl font-semibold'>Edit Product</h1>
      {error && (
        <p className='rounded-md bg-red-100/50 px-2 py-1 text-red-600'>
          {error}
        </p>
      )}
      <Input
        id='edit-product-form-title'
        label='Title'
        name='title'
        value={title}
        onChange={handleInputChange}
      />
      <Input
        id='edit-product-form-thumbnail'
        label='thumbnail'
        name='thumbnail'
        value={thumbnail}
        onChange={handleInputChange}
      />
      <Input
        id='edit-product-form-category'
        label='category'
        name='category'
        value={category}
        onChange={handleInputChange}
      />
      <Input
        id='edit-product-form-price'
        label='price'
        name='price'
        value={price}
        onChange={handleInputChange}
      />
      <Input
        type='number'
        id='edit-product-form-rating'
        label='rating'
        name='rating'
        value={rating}
        onChange={handleInputChange}
      />
      <Input
        type='number'
        id='edit-product-form-discount-percentage'
        label='discountPercentage'
        name='discountPercentage'
        value={discountPercentage}
        onChange={handleInputChange}
      />
      <Input
        id='edit-product-form-image-link'
        label='image Link'
        name='images'
        value={images[0]}
        onChange={handleInputChange}
      />
      <Button type='submit' label='Edit Product' />
    </form>
  );
};

export default EditProductForm;
