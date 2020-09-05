import React, { useContext } from 'react';
import { routesPaths } from '../../constants';
import { Link } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';
import { IProduct } from '../../types';

interface IProps {
  product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  const { setProduct } = useContext(ProductContext);

  return (
    <div className='product-card'>
      <div className='product-card__wrapper'>
        <Link
          to={routesPaths.products.getProductPath(1)}
          onClick={() => setProduct(product)}
        >
          <div className='product-card__wrapper__image'>
            <div
              style={{
                backgroundImage: `url('${product.image}')`,
                backgroundColor: '#ffffff',
                backgroundSize: 'contain',
              }}
              className='img'
            />
            <div className='product-card__wrapper__image__detail'>
              <p>{product.name}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
