export const routesPaths = {
  dashboard: {
    base: '/',
  },
  products: {
    base: '/products',
    product: '/products/:productId',
    getProductPath: (productId: number) => `/products/${productId}`,
  },
};
