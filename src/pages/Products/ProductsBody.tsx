import EditProductForm from '@/features/products/EditProductForm';
import { ProductCard } from './ProductCard';
import Model from '@/components/ui/Model';
import { useAppSelector } from '@/redux/store';

export const ProductBody = () => {
  const { list, loading, editProductId } = useAppSelector(
    (state) => state.products
  );
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <ul className='my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      {editProductId && (
        <Model>
          <EditProductForm productId={editProductId} />
        </Model>
      )}
    </>
  );
};
