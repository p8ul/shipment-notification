import React, { useContext } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Layout from '../Layout';

import { ProductContext } from '../Context/ProductContext';

import { INotification, IProduct } from '../../types';
import NotificationCard from '../Notification/NotificationCard';
import Empty from '../Empty';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),

      color: theme.palette.text.secondary,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      backgroundColor: '#2362FF',
    },
  })
);

const Product = () => {
  const classes = useStyles();
  const { product, setProducts, products, setProduct } = useContext(
    ProductContext
  );

  const { notifications, name, id } = product;
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addNotification = () => {
    const newNotifications: INotification[] = [...notifications];
    newNotifications.unshift({
      productId: id,
      message: '',
      sendTo: '',
      id: undefined,
    } as INotification);

    let copyOfProducts = [...products];
    let copyOfProduct: IProduct = { ...product };

    copyOfProduct.notifications = newNotifications;

    const index = _.findIndex(copyOfProducts, function (o: IProduct) {
      return o.id === id;
    });
    copyOfProducts[index] = copyOfProduct;

    setProducts(copyOfProducts);
    setProduct(copyOfProduct);
    setExpanded(0);
  };
  if (Object.keys(product).length === 0) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <Layout>
      <div style={{ position: 'relative', minHeight: '80vh' }}>
        <div>
          <h1 className='product-name'>{name}</h1>
          <h4>Shipping Notifications</h4>
        </div>
        <div className={classes.root}>
          {notifications &&
            notifications.map((notification: INotification, index) => (
              <NotificationCard
                handleChange={handleChange}
                expanded={expanded}
                key={`${notification.id}-${index}`}
                notification={notification}
                index={index}
              />
            ))}
          {notifications && notifications.length === 0 && (
            <Empty message={'No notification found!'} subtext=" Click add button below to add a message." />
          )}
          <Fab
            color='secondary'
            aria-label='add'
            className={classes.fab}
            onClick={addNotification}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
