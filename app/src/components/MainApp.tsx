import React, { useContext } from 'react';
import ProductCard from './Product/ProductCard';
import Layout from './Layout';
import { ProductContext } from './Context/ProductContext';
import Empty from './Empty';
import AddProduct from './AddProduct';

interface IProps {}

const MainApp: React.FC<IProps> = () => {
  const { products } = useContext(ProductContext);

  return (
    <Layout>
      <div className='table'>
        <div className='table-header'>
          <div>
            <h1>Products</h1>
          </div>
        </div>
        {products.map((product, i) => (
          <ProductCard key={`${product.name}-${i}`} product={product} />
        ))}
        {products && products.length === 0 && (
          <>
            <Empty message={'No products found!'} />
            <AddProduct />
          </>
        )}
      </div>
    </Layout>
  );
};

export default MainApp;
