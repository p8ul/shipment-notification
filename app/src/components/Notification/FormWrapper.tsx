import React, { useContext } from 'react';
import { Formik, FormikProps } from 'formik';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useToasts } from 'react-toast-notifications'

import { FormValues, INotification } from '../../types';
import { api } from '../../utils/api';
import { ProductContext } from '../Context/ProductContext';


interface WrapperChilrenProps {
  formBag: FormikProps<FormValues>;
}
interface IProps {
  children: (params: WrapperChilrenProps) => React.ReactNode;
  notification: INotification;
  productId: number;
}

const FormWrapper: React.FC<IProps> = ({
  children,
  notification,
  productId,
}) => {
  const { setProduct } = useContext(ProductContext);
  const { addToast } = useToasts()
  const validate = (values: FormValues) => {
    const errors: { message?: string; sendTo?: string } = {};
    if (!values.message) {
      errors.message = 'Required';
    }
    if (values.sendTo) {
      if (!isValidPhoneNumber(values.sendTo)) {
        errors.sendTo = 'Please enter a valid phone number';
      }
    }
    return errors;
  };

  return (
    <Formik
      onSubmit={async (input, formActions) => {
        formActions.setSubmitting(true);
        if (input.id) {
          await api.notification.update({ notification: input, productId })
          .then(res => addToast('Message updated successfully', { appearance: 'success'}))
          .catch(res => addToast('Error updating Message', { appearance: 'error'}))
        } else {
          await api.notification.save({ notification: input, productId })
          .then(res => addToast('Message saved successfully', { appearance: 'success'}))
          .catch(res => addToast('Error saving message', { appearance: 'error'}))
        }

        await api.product.get(productId).then((res) => {
          if (res.data && res.data.length > 0) setProduct(res.data[0]);
        });
        formActions.setSubmitting(false);
      }}
      initialValues={{
        message: notification.message,
        sendTo: notification.sendTo,
        productId: notification.productId,
        id: notification.id as number | undefined,
        draft: notification.draft,
      }}
      validate={validate}
      validateOnChange={false}
      render={(formBag) => {
        return children({ formBag });
      }}
    />
  );
};

export default FormWrapper;
