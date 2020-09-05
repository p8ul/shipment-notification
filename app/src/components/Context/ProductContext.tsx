import React, { useState, useEffect } from 'react';
import { IProduct, IProductContext } from '../../types';
import { api } from '../../utils/api';


export const ProductContext = React.createContext<IProductContext>({} as IProductContext);

interface IProps {
  children: React.ReactNode;
}

const ProductProvider: React.FC<IProps> = ({ children }) => {
  const [product, setProduct] = useState({} as IProduct);
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() =>{
    api.product.list().then(res => {
        setProducts(res.data || [])      
    })
  },[])

  const value = React.useMemo(
    () => ({
      product,
      setProduct,
      products,
      setProducts
    }),
    [product, products]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
