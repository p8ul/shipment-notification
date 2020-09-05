import axios from 'axios';
import { IPostNotification, IProduct } from '../types';

export const client = axios.create({
  baseURL: 'http://0.0.0.0:5000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  product: {
    list: () => client.get('products'),
    get: (id: number) => client.get(`products/${id}`),
    create: (data: IProduct) => client.post('products', data),
  },
  notification: {
    save: ({ notification, productId, id }: IPostNotification) =>
      client.post(`${productId}/notifications`, notification),
    update: ({ notification, productId }: IPostNotification) =>
      client.put(`${productId}/notifications/${notification.id}`, notification),
  },
};
