import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { IProps } from '../../types';
import ProductProvider from './ProductContext';

const Context: React.FC<IProps> = ({ children }) => {
  return (
    <ToastProvider>
      <ProductProvider>{children}</ProductProvider>
    </ToastProvider>
  );
};

export default Context;
