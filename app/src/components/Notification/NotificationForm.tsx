import React from 'react';
import PhoneInput from 'react-phone-number-input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import { FormValues } from '../../types';
import { useState } from 'react';
import { FormikProps } from 'formik';
import { TextareaAutosize } from '@material-ui/core';


interface IProps {
  formBag: FormikProps<FormValues>;
}
const NotificationForm: React.FC<IProps> = ({ formBag }) => {
  const {
    values: { message, sendTo },
  } = formBag;
  const [phoneNo, setPhoneNo] = useState(sendTo);
  const [textMessage, setTextMessage] = useState(sendTo);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextareaAutosize
          placeholder='Please add your message here.'
          defaultValue={message}
          onChange={({ target: { value } }) => {
            setTextMessage(value);
          }}
          onBlur={() => {
            formBag.setFieldValue('message', textMessage);
          }}
        />
        {formBag.errors && formBag.errors.message && <div className="error">{formBag.errors.message}</div>}
      </Grid>
      <Grid item xs={12}>
        <PhoneInput
          className='phone-input'
          placeholder='Enter phone number'
          value={phoneNo}
          onChange={(e) => {
            setPhoneNo(e);
            formBag.setFieldValue('sendTo', e);
          }}
        />
        {formBag.errors && formBag.errors.sendTo && <div className="error">{formBag.errors.sendTo}</div>}
      </Grid>
      <Grid item xs={12}>
        <div className='action-buttons'>
          <Button
            variant='contained'
            size='small'
            className={'save-button'}
            startIcon={<SaveIcon />}
            onClick={() => {
              formBag.setFieldValue('draft', true); 
              formBag.submitForm()
            }}
          >
            Save as draft
          </Button>
          <Button
            variant='contained'
            size='small'
            disabled={formBag.isSubmitting}
            className={'send-button'}
            endIcon={<Icon>send</Icon>}
            onClick={() => {
              formBag.setFieldValue('draft', false); 
              formBag.submitForm()
            }}
          >
            Send
          </Button>
        </div>
      </Grid>
      
    </Grid>
  );
};

export default NotificationForm;
