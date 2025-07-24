import { useState, type FormEvent } from 'react';
import { toggleAddProductForm } from './productsSlice';
import { useAppDispatch } from '@/redux/store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { addProduct, type ProductItem } from './productThunkApi';
import { MdClose } from 'react-icons/md';

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

const AddProductForm = () => {
  const dispatch = useAppDispatch();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, [name]: [...formData.images[0], value] });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('add ok');
    const { title, price, thumbnail, images, category, discountPercentage } =
      formData;
    if (
      !title ||
      !price ||
      !thumbnail ||
      !images[0] ||
      !category ||
      !discountPercentage
    ) {
      setError('Please fill all the fields');
      return;
    }
    dispatch(addProduct(formData));
    setFormData({
      title: '',
      price: '',
      thumbnail: '',
      images: [''],
      category: '',
      rating: 0,
      discountPercentage: 0,
    });
    dispatch(toggleAddProductForm(false));
    setError(null);
  };

  const { title, price, thumbnail, images, category, discountPercentage } =
    formData;
  return (
    <form className='relative space-y-4 space-x-2' onSubmit={handleAdd}>
      <div className='absolute top-0 right-0'>
        <Button
          label={<MdClose className='size-6' />}
          className='cursor-pointer bg-transparent p-2.5 text-black shadow-md'
          onClick={() => dispatch(toggleAddProductForm(false))}
        />
      </div>
      <h1 className='mb-4 text-center text-3xl font-semibold'>Add Product</h1>
      {error && (
        <p className='rounded-md bg-red-100/50 px-2 py-1 text-red-600'>
          {error}
        </p>
      )}
      <Input
        id='add-product-form-title'
        label='Title'
        name='title'
        value={title}
        onChange={handleInputChange}
      />
      <Input
        id='add-product-form-thumbnail'
        label='thumbnail'
        name='thumbnail'
        value={thumbnail}
        onChange={handleInputChange}
      />
      <Input
        id='add-product-form-category'
        label='category'
        name='category'
        value={category}
        onChange={handleInputChange}
      />
      <Input
        id='add-product-form-price'
        label='price'
        name='price'
        value={price}
        onChange={handleInputChange}
      />
      <Input
        type='number'
        id='add-product-form-discount-percentage'
        label='discountPercentage'
        name='discountPercentage'
        value={discountPercentage}
        onChange={handleInputChange}
      />
      <Input
        id='add-product-form-image-link'
        label='image Link'
        name='images'
        value={images[0]}
        onChange={handleInputChange}
      />
      <Button type='submit' label='Add Product' />
    </form>
  );
};

export default AddProductForm;
