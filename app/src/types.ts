import { FormikProps } from "formik";

export interface IProduct {
  name: string;
  description: string;
  image: string;
  id?: number;
  notifications: INotification[]
}

export interface INotification {
  message: string;
  sendTo: string;
  productId: number;
  id?: number | undefined;
  draft: boolean
}

export interface IProductContext {
  product: IProduct;
  setProduct: (product: IProduct) => void;
  products: IProduct[],
  setProducts: (products: IProduct[]) => void;
}

export interface IProps {
  children: React.ReactNode;
}

export interface  IPostNotification {
  notification: INotification,
  productId: number,
  id?: number | undefined
}


export interface FormValues {
  message: string;
  sendTo: string;
  productId: number;
  id: number | undefined;
  draft: boolean;
}

export interface INotificationFormProps {
  formBag: FormikProps<FormValues>;
}
